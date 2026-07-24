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
1. FORMAL STRUCTURE & LAYOUT:
   - Header: Address the relevant head officer in Pakistan (e.g. "To, The SDO, WAPDA..." or "بخدمت جناب ایس ایچ او صاحب، تھانہ _____،").
   - Subject Line: Single-line concise subject summarizing the grievance (e.g., "موضوع: درخواست برائے..." or "Subject: Application for...").
   - Salutation: "Respected Sir," or "جنابِ عالی،"
   - Body (2-3 paragraphs): 
     * Paragraph 1: State the applicant's status and core issue clearly.
     * Paragraph 2: Provide specific impact, timeline, damages, or facts extracted from the raw text.
     * Paragraph 3: Formal prayer/request for relief or administrative action.
   - Closing: "Yours Faithfully," or "العارض،"
   - Sign-off Block: Include clear details or placeholders for Name, Father Name, CNIC, Mobile Number, Address, and Date.

2. LANGUAGE & TONE RULES:
   - If Output Language is "Urdu": Write strictly in correct, formal Urdu script (NO Roman Urdu in draft output). Use professional administrative & legal vocabulary like 'سائل' (applicant), 'استدعا ہے' (it is requested), 'پابندِ سلاسل' (apprehended), 'ازالہ' (redressal), 'داد رسی', 'سائلہ', 'موقف', 'فریاد'.
   - If Output Language is "English": Use formal British/Pakistani administrative English (e.g., "Most respectfully state...", "It is humbly requested that...", "Prayer", "Applicant").
   - Do NOT translate Roman Urdu literally; extract the core meaning and rewrite it in formal legal prose.

3. SAFETY & BOUNDARIES (STRICT):
   - INVALID/VAGUE INPUTS: If the user's complaint is complete gibberish, empty, or lacks any actual problem, output ONLY this single line:
     "براہِ کرم اپنے مسئلے کی مکمل تفصیل فراہم کریں تاکہ درخواست لکھی جا سکے۔" (or if Output Language is English: "Please provide complete details of your problem so that the application can be drafted.")
   - ABUSE / ILLEGAL CONTENT: Refuse any explicit requests to draft hate speech, threats, or illegal documents with a single concise polite refusal.
   - NO EXTRA TALK: The application text MUST be provided cleanly without introductory phrases like "Here is your application" and MUST NOT use markdown code block fences (\`\`\`).
`;

    // We will call Gemini 3.6 Flash using JSON mode to get both the application text and supplementary guidance
    const prompt = `
Raw Complaint Input:
"${rawComplaint}"

Generate a response as JSON with two fields:
1. "applicationText": The complete, pristine, formal administrative application string formatted strictly according to the system rules above.
2. "legalNotes": A string providing concise helpful guidance in Pakistan's context (e.g. relevant laws like PPC sections, Consumer Rights Act, Ombudsman procedure, required documents/attachments list like CNIC copy, bill, affidavit, and where to submit).
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            applicationText: {
              type: Type.STRING,
              description: "The official drafted legal application."
            },
            legalNotes: {
              type: Type.STRING,
              description: "Guidance on laws, required attachments, and submission steps in Pakistan."
            }
          },
          required: ["applicationText"]
        }
      }
    });

    const resultText = response.text || "{}";
    let parsedResult = { applicationText: "", legalNotes: "" };
    
    try {
      parsedResult = JSON.parse(resultText);
    } catch {
      parsedResult = {
        applicationText: resultText,
        legalNotes: "Please ensure all relevant supporting documents (CNIC copy, receipts, proof) are attached when submitting to the concerned department."
      };
    }

    res.json({
      success: true,
      applicationText: parsedResult.applicationText,
      legalNotes: parsedResult.legalNotes || ""
    });

  } catch (error: any) {
    console.error("Error drafting application:", error);
    res.status(500).json({
      error: "Failed to draft application. Please check your network or API key configuration.",
      details: error.message
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
    res.status(500).json({ error: error.message });
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Arzi-Navees server running on http://localhost:${PORT}`);
  });
}

startServer();
