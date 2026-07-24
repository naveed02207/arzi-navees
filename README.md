# ✍️ Arzi-Navees (عریضہ نویس) - The AI Public Application Draftsman

## 🚀 Live Demo
**[Insert Your Vercel / Render Live URL Here]** *(Link is clickable and working)*

## 💡 The Problem & App Identity (What and For Whom)
**The Problem:** In Pakistan, common citizens (shopkeepers, laborers, elders) often face administrative issues like stolen meters, overflowing sewers, or petty thefts. However, dealing with government departments (WAPDA, Police, Municipal Committees) requires highly formal and structured legal applications. The average citizen cannot draft these, forcing them to pay local typists or face rejection due to improper formatting.

**The Solution:** *Arzi-Navees* is an AI-powered localized drafting assistant. It takes a citizen's rough, informal complaint (in Roman Urdu, broken English, or simple Urdu) and instantly generates a highly formal, respectful, and legally sound official application ready for submission. It empowers the common man to interact with the system confidently and at zero cost.

## ✨ Features
*   **Plain-Language Input:** Understands messy, emotional, or locally-phrased Roman Urdu and translates the intent into formal prose.
*   **Bilingual Output:** Generates official applications in both proper formal **Urdu** script and administrative **English**.
*   **Department-Specific Structuring:** Automatically formats the application for specific authorities (e.g., Police SHO, WAPDA SDO, Municipal Chief Officer).
*   **Intelligent Safety Guardrails:** AI automatically refuses to draft abusive, illegal, or completely vague requests, ensuring the tool is used responsibly.
*   **Zero-Database Architecture:** No login required. Users just open, draft, and copy/print.

## 🧠 The AI Feature & System Prompt
**What it does:** The core intelligence of the app is driven by Google's Gemini AI. It acts as an expert Pakistani legal draftsman. It parses the intent from colloquial text, applies strict formatting rules, translates colloquialisms into administrative vocabulary (e.g., turning "bijli udar gai" into "بجلی کی ترسیل منقطع ہے"), and formats the output into a printable letter.

**The System Prompt:**
The AI is instructed strictly using the following prompt to ensure legal safety and structural accuracy:
\`\`\`text
You are 'Arzi-Navees' (عریضہ نویس), an expert Legal Draftsman and Public Service Clerk in Pakistan. Your core function is to convert informal, rough, or poorly phrased complaints (written in Roman Urdu, Urdu, or broken English) into formal, official, and legally sound administrative applications.

### CORE DRAFTING RULES:
1. FORMAL STRUCTURE: Use standard Pakistani application format (Header addressed to head officer, Subject Line, Respected Sir/جنابِ عالی, 2-3 body paragraphs, Yours Faithfully/العارض, and Footer placeholders).
2. LANGUAGE RULES: If Urdu, write in formal Urdu script with administrative vocabulary (سائل, استدعا ہے). Do not translate Roman Urdu literally; extract intent.
3. SAFETY BOUNDARIES: Refuse explicit requests for hate speech/illegal documents. If input is completely vague/empty, politely ask for more details. Do NOT invent false facts or names. Do not use markdown wrappers.
\`\`\`

## 🛠️ Tech Stack & Tools Used
*   **AI Model:** Google AI Studio (Gemini 1.5 Flash) - Chosen for lightning-fast text generation and high accuracy in Urdu processing.
*   **Frontend:** React (Vite) + Tailwind CSS - For a clean, mobile-first, and highly responsive user interface.
*   **Backend:** Node.js + Express.js - Acts as a secure bridge to handle API calls to Google AI without exposing the API key on the client side.
*   **Deployment:** Vercel (Frontend) & Render (Backend API).

## 📸 Screenshots
*(Add 3 images here before submitting)*
1. `![Input Screen](link-to-image-1.png)` *(Showing the user entering a rough Roman Urdu complaint)*
2. `![Urdu Result](link-to-image-2.png)` *(Showing a beautifully formatted Urdu application)*
3. `![English Result](link-to-image-3.png)` *(Showing the English version for a police department)*

## ⚙️ How to Run the Project Locally
To run this project on your local machine, follow these steps:

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/[YourUsername]/arzi-navees.git
   cd arzi-navees
   \`\`\`

2. **Setup the Backend:**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`
   *   Create a `.env` file in the `backend` folder.
   *   Add your Google AI Studio API Key: `GEMINI_API_KEY=your_key_here`
   *   Start the server: `node index.js` (Runs on port 5000)

3. **Setup the Frontend:**
   Open a new terminal window:
   \`\`\`bash
   cd frontend
   npm install
   npm run dev
   \`\`\`
   *   The app will be running at `http://localhost:5173`.
   *   
