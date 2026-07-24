# ✍️ Arzi-Navees (عریضہ نویس) - The AI Public Application Draftsman

## 🚀 Live Demo
**[Arzi-Navees Live App Preview](https://ais-pre-wg3euucenvdpfeyowgzbul-577175268077.asia-southeast1.run.app)** *(Click to test the live application)*

---

## 💡 The Problem & App Identity (What and For Whom)

**The Problem:** In Pakistan, common citizens (shopkeepers, laborers, elders) often face administrative issues like stolen electricity meters, overflowing sewers, uncollected garbage, or petty thefts. However, dealing with government departments (WAPDA/LESCO/KE, Police, Municipal Committees, NADRA, Gas Utilities) requires highly formal and structured legal applications. The average citizen cannot draft these, forcing them to pay local typists (arzi-navees) at court gates or face rejection due to improper formatting and non-standard wording.

**The Solution:** *Arzi-Navees* is an AI-powered localized drafting assistant. It takes a citizen's rough, informal complaint (written in Roman Urdu, colloquial spoken Urdu, or broken English) and instantly generates a highly formal, respectful, and legally sound official administrative application ready for printing and submission. It empowers the common man to interact with the bureaucracy confidently and at zero cost.

---

## ✨ Features

* **Plain-Language Input & Audio Dictation:** Understands messy, emotional, or locally-phrased Roman Urdu and voice dictation, translating the raw intent into formal prose.
* **Bilingual Formal Output:** Generates official applications in both proper formal **Urdu** script (using **Jameel Noori Nastaleeq Kasheeda** font typography) and administrative **English**.
* **Department-Specific Structuring:** Automatically formats the application for specific authorities (e.g., Police SHO, WAPDA SDO, Municipal Chief Officer, NADRA In-charge, Gas Revenue Officer).
* **Direct Export to PDF & Print:** Features a clean, standard A4 layout generator using `jspdf` and `html2canvas` for immediate physical submission or digital sharing.
* **Auto-Saved Applicant Profile:** Saves applicant details (Name, CNIC, Phone, Address) locally in `localStorage` so returning users don't need to re-enter basic details for new complaints.
* **Intelligent Safety Guardrails & Legal Guidance:** AI automatically refuses abusive, illegal, or completely vague requests, and provides actionable legal checklist advice alongside the generated draft.
* **Zero-Database Architecture:** No login required. Users just open, draft, edit, and copy/print or export.

---

## 🧠 The AI Feature & System Prompt

**What it does:** The core intelligence of the app is driven by Google's Gemini AI (`gemini-2.5-flash`). It acts as an expert Pakistani legal draftsman. It parses the intent from colloquial text, applies strict formatting rules, translates colloquialisms into administrative vocabulary (e.g., turning *"bijli udar gai"* into *"بجلی کی ترسیل منقطع ہے"*), and formats the output into a printable letter.

**The System Prompt:**
The AI is instructed strictly using the following system prompt to ensure legal safety and structural accuracy:

```text
You are 'Arzi-Navees' (عریضہ نویس), an expert Legal Draftsman and Public Service Clerk in Pakistan. Your core function is to convert informal, rough, or poorly phrased complaints (written in Roman Urdu, Urdu, or broken English) into formal, official, and legally sound administrative applications.

### CORE DRAFTING RULES:
1. FORMAL STRUCTURE: Use standard Pakistani application format (Header addressed to head officer, Subject Line, Respected Sir/جنابِ عالی, 2-3 body paragraphs, Yours Faithfully/العارض, and Footer placeholders).
2. LANGUAGE RULES: If Urdu, write in formal Urdu script with administrative vocabulary (سائل, استدعا ہے). Do not translate Roman Urdu literally; extract intent.
3. SAFETY BOUNDARIES: Refuse explicit requests for hate speech/illegal documents. If input is completely vague/empty, politely ask for more details. Do NOT invent false facts or names. Do not use markdown wrappers.
```

---

## 🛠️ Tech Stack & Tools Used

* **AI Model:** Google AI Studio Gemini API (`@google/genai` SDK) — Chosen for lightning-fast text generation and high accuracy in Urdu administrative vocabulary processing.
* **Frontend:** React 18 + Vite + Tailwind CSS — Mobile-first, responsive, editorial layout styled with custom typography.
* **Typography:** `Jameel Noori Nastaleeq Kasheeda` font for authentic Pakistani legal document rendering (`font-display: swap`).
* **Export Utilities:** `jspdf` & `html2canvas` for high-resolution A4 PDF compilation.
* **Backend:** Node.js + Express.js — Serves as a secure server-side bridge for API proxies and static assets.

---

## 📸 Screenshots

1. `![Input Screen](https://raw.githubusercontent.com/placeholder/input-screen.png)` *(Showing the user selecting a department and entering a raw Roman Urdu complaint)*
2. `![Urdu Result](https://raw.githubusercontent.com/placeholder/urdu-result.png)` *(Showing a beautifully formatted Urdu application in Jameel Noori Nastaleeq Kasheeda)*
3. `![Export to PDF](https://raw.githubusercontent.com/placeholder/pdf-export.png)` *(Showing the direct A4 PDF download and print options)*

---

## ⚙️ How to Run the Project Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/arzi-navees.git
   cd arzi-navees
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_ai_studio_api_key_here
   ```

4. **Font File Setup (Optional for offline rendering):**
   Place `Jameel-Noori-Nastaleeq-Kasheeda.ttf` inside `public/fonts/Jameel-Noori-Nastaleeq-Kasheeda.ttf`.

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:3000` (or `http://localhost:5173`).
