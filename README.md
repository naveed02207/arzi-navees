# 🖋️ Arzi-Navees (عریضہ نویس) - Official Drafts for Pakistan

> **An AI-powered, bilingual drafting suite that transforms informal grievances into formal, legally sound administrative applications for Pakistani citizens.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![AI Powered](https://img.shields.io/badge/AI_Powered-LLM-000000?style=for-the-badge&logo=openai&logoColor=white)

---

## 🛑 The Problem Statement

Navigating the bureaucratic and administrative landscape in Pakistan can be a daunting task for the average citizen. When filing a complaint, applying for a correction, or requesting an official service, citizens are often hindered by:
- **Language Barriers & Administrative Jargon:** The requirement for formal "Sarkari Urdu" or precise legal English.
- **Financial Exploitation:** Reliance on traditional petition writers (*Arzi-Navees*) sitting outside courts and government offices, who often charge exorbitant fees for basic document drafting.
- **Formatting Constraints:** Ignorance of standard formats, official addresses, and requirements for stamp paper margins.

## 🧠 The AI-Powered Solution

Built as the capstone project for the **ACT AI** course, **Arzi-Navees** leverages large language models (LLMs) to democratize legal and administrative drafting. 

Instead of struggling with formal vocabulary, users can simply type their grievance in **Roman Urdu** or basic, informal language. The integrated AI engine intelligently interprets the context and generates a polished, structurally perfect, and legally sound application in standard official Urdu or English, ready for immediate submission.

## ✨ Advanced Technical Features

- **Perfect Bilingual Architecture:** Seamlessly handles multi-directional text. Utilizes Tailwind's logical properties (`start`, `end`) and custom fonts (*Jameel Noori Nastaleeq Kasheeda*) to ensure flawless LTR (English) and proper RTL Nastaleeq typography.
- **Native Stamp-Paper Print Engine:** Completely abandons unreliable third-party PDF libraries (like jsPDF or html2canvas) which often corrupt RTL scripts or blur text. Employs a pure, highly optimized CSS `@media print` solution, ensuring razor-sharp text and precise physical margins (e.g., reserving a massive top margin specifically for physical legal Stamp Papers).
- **Smart Auto-Fill & Local Persistence:** Implements robust local state management. The app remembers the applicant's profile (Name, CNIC, Phone, City) across sessions, allowing for lightning-fast application generation without repetitive data entry.
- **Premium UI/UX:** Designed with a sophisticated "Pure White & Emerald Green Gradient" aesthetic, mirroring the official identity of the Islamic Republic of Pakistan while maintaining a modern, accessible user experience.

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite for lightning-fast HMR and optimized production bundling
- **Styling:** Tailwind CSS (v4) with custom font configurations for Nastaleeq
- **Icons:** Lucide React for crisp, scalable vector icons
- **AI Integration:** Google Gemini API (Server-side via `@google/genai` SDK) for intelligent text generation and legal drafting

## 🚀 Getting Started

Follow these instructions to set up the project locally.

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/arzi-navees.git

# 2. Navigate into the project directory
cd arzi-navees

# 3. Install dependencies
npm install

# 4. Configure Environment Variables
# Create a .env file based on .env.example and add your GEMINI_API_KEY
cp .env.example .env

# 5. Start the development server
npm run dev
```

---

### 🎓 Academic Acknowledgement

**Arzi-Navees (عریضہ نویس)** is a Final Project developed for the **ACT AI** course.  
**Developer:** M Naveed Ul Hassan  
**Focus:** High-level AI integration alongside advanced frontend engineering and typography.

*Dedicated to simplifying access to justice and administrative services for the people of Pakistan.*
