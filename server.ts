import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini SDK with User-Agent header as required
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint to Draft Application
app.post("/api/draft", async (req, res) => {
  try {
    const { department, outputLanguage, applicant, rawComplaint } = req.body;

    if (!rawComplaint || typeof rawComplaint !== "string" || !rawComplaint.trim()) {
      return res.status(400).json({
        error: "Empty complaint description.",
        draft: outputLanguage === "English" 
          ? "Please provide complete details of your problem so that the application can be drafted."
          : "براہِ کرم اپنے مسئلے کی مکمل تفصیل فراہم کریں تاکہ درخواست لکھی جا سکے۔"
      });
    }

    const ai = getGeminiClient();

    const systemInstruction = `
You are 'Arzi-Navees' (عریضہ نویس), an expert Legal Draftsman and Public Service Clerk in Pakistan. Your core function is to convert informal, rough, or poorly phrased complaints (written in Roman Urdu, Urdu, or broken English) into formal, official, and legally sound administrative applications.

INPUT DATA EXPECTED:
1. Target Department: ${department || "General Administrative Office"}
2. Preferred Output Language: ${outputLanguage || "Urdu"}
3. Applicant Details:
   - Name: ${applicant?.name || "[نام / Name]"}
   - Father/Husband Name: ${applicant?.fatherName || "[ولدیت / Father's Name]"}
   - CNIC Number: ${applicant?.cnic || "[شناختی کارڈ نمبر / CNIC]"}
   - Mobile Number: ${applicant?.phone || "[موبائل نمبر / Phone]"}
   - Address & City: ${applicant?.address || "[موجودہ پتہ و شہر / Address & City]"}
   - Date: ${applicant?.date || new Date().toISOString().split('T')[0]}

CORE DRAFTING RULES:
1. FORMAL STRUCTURE & PARAGRAPH FORMATTING (CRITICAL):
   - Header: Address the relevant head officer in Pakistan (e.g. "بخدمت جناب ایس ڈی او صاحب، واپڈا..." or "بخدمت جناب ایس ایچ او صاحب، تھانہ _____،").
   - Subject Line: Single-line concise subject summarizing the grievance (e.g., "موضوع: درخواست برائے..." or "Subject: Application for...").
   - Salutation: "جنابِ عالی،" or "Respected Sir,"
   - Body Paragraphs: You MUST separate the introduction, the main issue, and the request/prayer into distinct paragraphs using double line breaks (\n\n). Do NOT return a single block of text.
     * Paragraph 1 (Introduction & Status): State the applicant's residence, identity, and background status clearly.
     * Paragraph 2 (Detailed Complaint & Facts): Expand the user's raw input into a fully detailed, mature, and comprehensive narrative. Detail the specific hardship, timeline, financial or physical damages, public nuisance, or breach of administrative duty. Add professional filler where necessary to make it look like a complete, authoritative legal document.
     * Paragraph 3 (Prayer / Request for Relief): Formal prayer for immediate administrative action, investigation, or grievance redressal.
   - Closing: "العارض،" or "Yours Faithfully,"
   - Sign-off Block: Include clear details for Name, Father/Husband Name, CNIC, Mobile Number, Address, and Date.

2. STRICT URDU ORTHOGRAPHY (IMLA) & PROFESSIONAL DETAIL:
   - STRICT URDU ORTHOGRAPHY (Imla): Use standard and correct Pakistani Urdu spellings. For example, ALWAYS write "زائد" (never زاید), "درخواست" (never درخاست), "گزارش" (never گذارش), "تعمیل" (never تمیل), "جنابِ عالی" (never جناب عالی), "سائل" (never سائلہ unless female), "حسبِ ضابطہ" (never حسب ضابطہ).
   - PROFESSIONAL DETAIL: Do not generate vague or short summaries. Expand the user's raw input into a fully detailed, mature, and legally sound administrative application. Add professional filler where necessary to make it look like a real, complete document.
   - Use professional administrative & legal vocabulary like 'سائل' / 'سائلہ' (applicant), 'استدعا ہے' (it is requested), 'پابندِ سلاسل' (apprehended), 'ازالہ' (redressal), 'داد رسی', 'موقف', 'فریاد', 'حسبِ ضابطہ'.
   - If Output Language is "English": Use formal British/Pakistani administrative English (e.g., "Most respectfully state...", "It is humbly requested that...", "Prayer", "Applicant").
   - Do NOT translate Roman Urdu literally; extract the core meaning and rewrite it into formal legal prose.

3. SAFETY & BOUNDARIES (STRICT):
   - INVALID/VAGUE INPUTS: If the user's complaint is complete gibberish, empty, or lacks any actual problem, output ONLY this single line:
     "براہِ کرم اپنے مسئلے کی مکمل تفصیل فراہم کریں تاکہ درخواست لکھی جا سکے۔" (or if Output Language is English: "Please provide complete details of your problem so that the application can be drafted.")
   - ABUSE / ILLEGAL CONTENT: Refuse any explicit requests to draft hate speech, threats, or illegal documents with a single concise polite refusal.
   - NO EXTRA TALK: The application text MUST be provided cleanly without introductory phrases like "Here is your application" and MUST NOT use markdown code block fences (\`\`\`).
`;

    // We will call Gemini 3.6 Flash using JSON mode to get both the application text and supplementary guidance
    const prompt = `Raw Complaint Input:
"${rawComplaint}"

Generate the complete, pristine, formal administrative application string formatted strictly according to the system rules above. Do NOT include any markdown formatting, JSON, or additional notes. Just return the text of the application.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction
      }
    });

    const resultText = response.text || "";

    res.json({
      success: true,
      applicationText: resultText
    });

  } catch (error: any) {
    console.error("Error drafting application:", error);
    res.status(500).json({
      error: "Failed to draft application. Please check your network or API key configuration.",
      details: "An internal server error occurred."
    });
  }
});

// Endpoint for Legal Q&A / Escalation Advice
app.post("/api/legal-advice", async (req, res) => {
  try {
    const { question, department, currentDraft, language } = req.body;
    const ai = getGeminiClient();

    const systemInstruction = `You are 'Arzi-Navees' (عریضہ نویس), a knowledgeable Pakistani public clerk and legal assistant. Answer the user's practical administrative/legal questions regarding filing applications, police FIRs, WAPDA Ombudsman, NADRA complaints, Consumer Courts, or procedural rights in Pakistan. Keep answers concise, actionable, and encouraging. Respond in ${language || "Urdu"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Department: ${department}\nCurrent Draft Context:\n${currentDraft}\n\nUser Question:\n${question}`,
      config: { systemInstruction }
    });

    res.json({ success: true, answer: response.text });
  } catch (error: any) {
    res.status(500).json({ error: "An unexpected error occurred while processing your request." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Arzi-Navees server running on http://localhost:${PORT}`);
  });
}

startServer();
