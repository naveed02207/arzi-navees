import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { DepartmentSelector } from "./components/DepartmentSelector";
import { ApplicantForm } from "./components/ApplicantForm";
import { ComplaintInput } from "./components/ComplaintInput";
import { DraftPreview } from "./components/DraftPreview";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { GuideModal } from "./components/GuideModal";
import { LegalAdviceModal } from "./components/LegalAdviceModal";
import { DEPARTMENTS, Department } from "./data/departments";
import { ApplicantDetails, DraftResponse, OutputLanguage } from "./types";
import { AlertCircle, Scale, RotateCcw } from "lucide-react";

const STORAGE_KEY = "arzi_navees_saved_drafts";
const APPLICANT_STORAGE_KEY = "arzi_navees_applicant_details";

export default function App() {
  const [selectedDept, setSelectedDept] = useState<Department>(DEPARTMENTS[0]);
  const [outputLanguage, setOutputLanguage] = useState<OutputLanguage>("Urdu");
  
  const [applicant, setApplicant] = useState<ApplicantDetails>({
    name: "",
    fatherName: "",
    cnic: "",
    phone: "",
    address: "",
    city: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [rawComplaint, setRawComplaint] = useState<string>("");
  const [draftResponse, setDraftResponse] = useState<DraftResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // History & Storage state
  const [savedDrafts, setSavedDrafts] = useState<DraftResponse[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Guide & Q&A Modal states
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [legalAdviceModal, setLegalAdviceModal] = useState<{
    isOpen: boolean;
    question: string;
    answer: string;
    isLoading: boolean;
  }>({
    isOpen: false,
    question: "",
    answer: "",
    isLoading: false,
  });

  // Load saved history & applicant details from localStorage on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedDrafts(JSON.parse(stored));
      }

      const storedApplicant = localStorage.getItem(APPLICANT_STORAGE_KEY);
      if (storedApplicant) {
        const parsed = JSON.parse(storedApplicant);
        setApplicant((prev) => ({
          ...prev,
          ...parsed,
          date: new Date().toISOString().split("T")[0],
        }));
      }
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
  }, []);

  const handleApplicantChange = (updated: ApplicantDetails) => {
    setApplicant(updated);
    try {
      localStorage.setItem(APPLICANT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save applicant details to localStorage", e);
    }
  };

  const handleSelectDepartment = (dept: Department) => {
    setSelectedDept(dept);
  };

  const handleSelectSamplePrompt = (sampleText: string, sampleTitle: string) => {
    setRawComplaint(sampleText);
  };

  const handleDraftSubmit = async () => {
    if (!rawComplaint.trim()) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          department: selectedDept.officerTitleUrdu + " - " + selectedDept.nameEnglish,
          outputLanguage,
          applicant,
          rawComplaint,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate draft");
      }

      const newDraft: DraftResponse = {
        id: "draft_" + Date.now(),
        applicationText: data.applicationText || "",
        legalNotes: data.legalNotes || "",
        timestamp: new Date().toISOString(),
        request: {
          departmentId: selectedDept.id,
          departmentName: selectedDept.nameUrdu,
          officerTitle: selectedDept.officerTitleUrdu,
          outputLanguage,
          applicant,
          rawComplaint,
        },
      };

      setDraftResponse(newDraft);

      // Scroll preview into view smoothly
      setTimeout(() => {
        const previewElem = document.getElementById("draft-preview-section");
        if (previewElem) {
          previewElem.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

    } catch (err: any) {
      console.error("Error generating draft:", err);
      setErrorMessage(err.message || "درخواست کی تیاری میں تاخیر ہوئی۔ برائے مہربانی اپنا پیغام دوبارہ چیک کریں۔");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToHistory = (draft: DraftResponse) => {
    const exists = savedDrafts.some((d) => d.id === draft.id);
    let updated: DraftResponse[];
    if (exists) {
      updated = savedDrafts.filter((d) => d.id !== draft.id);
    } else {
      updated = [draft, ...savedDrafts];
    }
    setSavedDrafts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to storage", e);
    }
  };

  const handleDeleteDraftFromHistory = (id: string) => {
    const updated = savedDrafts.filter((d) => d.id !== id);
    setSavedDrafts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update storage", e);
    }
  };

  const handleClearAllHistory = () => {
    setSavedDrafts([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleAskLegalQuestion = async (question: string) => {
    setLegalAdviceModal({
      isOpen: true,
      question,
      answer: "",
      isLoading: true,
    });

    try {
      const res = await fetch("/api/legal-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          department: selectedDept.nameUrdu,
          currentDraft: draftResponse?.applicationText || "",
          language: outputLanguage,
        }),
      });

      const data = await res.json();
      setLegalAdviceModal((prev) => ({
        ...prev,
        answer: data.answer || "معذرت، اس وقت قانونی مشورہ حاصل نہیں ہو سکا۔",
        isLoading: false,
      }));
    } catch (err) {
      setLegalAdviceModal((prev) => ({
        ...prev,
        answer: "رابطے میں مسئلہ پیش آیا۔ برائے کرم بعد میں کوشش کریں۔",
        isLoading: false,
      }));
    }
  };

  const isCurrentSaved = draftResponse
    ? savedDrafts.some((d) => d.id === draftResponse.id)
    : false;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C] flex flex-col font-urdu selection:bg-[#8B735B] selection:text-white">
      
      {/* Top Bar Navigation */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={savedDrafts.length}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Editorial Hero Banner */}
        <section className="bg-white border border-black/10 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-sm no-print">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] text-[#8B735B] border border-black/5 text-xs font-semibold font-sans">
                <Scale className="w-3.5 h-3.5 text-[#8B735B]" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Editorial Legal & Administrative Suite</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold italic tracking-tight text-[#1C1C1C]">
                عریضہ نویس — غیر باضابطہ شکایات کو باضابطہ قانونی درخواستوں میں تبدیل کریں
              </h1>
              <p className="text-xs sm:text-sm text-[#1C1C1C]/70 font-urdu max-w-2xl leading-relaxed">
                رومن اردو، سلیس اردو یا انگریزی میں اپنا مسئلہ درج کریں۔ نظام آپ کی شکایت کو تھانہ، واپڈا، نادرا، میونسپلٹی اور دیگر تمام پاکستانی سرکاری دفاتر کی تسلیم شدہ قانونی زبان و سلیس خاکہ میں ڈھال دے گا۔
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  setRawComplaint("");
                  setDraftResponse(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FAF9F6] hover:bg-stone-100 text-[#1C1C1C] text-xs font-bold border border-black/10 transition-colors uppercase tracking-wider"
                title="تمام فارم نیا کریں"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#8B735B]" />
                <span>نیا فارم (Reset)</span>
              </button>
            </div>
          </div>
        </section>

        {/* Step 1: Department Selection */}
        <section className="no-print">
          <DepartmentSelector
            selectedDepartmentId={selectedDept.id}
            onSelectDepartment={handleSelectDepartment}
            onSelectSamplePrompt={handleSelectSamplePrompt}
          />
        </section>

        {/* Step 2: Applicant Information Form */}
        <section className="no-print">
          <ApplicantForm
            applicant={applicant}
            onChange={handleApplicantChange}
            outputLanguage={outputLanguage}
          />
        </section>

        {/* Step 3: Raw Complaint Input */}
        <section className="no-print">
          <ComplaintInput
            rawComplaint={rawComplaint}
            onComplaintChange={setRawComplaint}
            outputLanguage={outputLanguage}
            onLanguageChange={setOutputLanguage}
            onSubmitDraft={handleDraftSubmit}
            isLoading={isLoading}
            departmentName={selectedDept.nameUrdu}
          />
        </section>

        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center gap-3 text-rose-800 text-xs sm:text-sm font-urdu no-print">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 4: Final Formal Legal Application Preview & Actions */}
        <section id="draft-preview-section">
          <DraftPreview
            draftResponse={draftResponse}
            outputLanguage={outputLanguage}
            onSaveToHistory={handleSaveToHistory}
            isSaved={isCurrentSaved}
            onAskLegalQuestion={handleAskLegalQuestion}
          />
        </section>

      </main>

      {/* Editorial Footer */}
      <footer className="bg-white border-t border-black/10 py-6 mt-16 text-center text-xs text-stone-500 font-urdu no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            عریضہ نویس (Arzi-Navees) — تمام درخواستی خاکے پاکستانی انتظامی قوانین و روایات کے مطابق ہیں
          </p>
          <p className="text-[11px] text-stone-400 font-sans">
            © {new Date().getFullYear()} Editorial Administrative Drafting Suite • Official Civil Assistance
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedDrafts={savedDrafts}
        onSelectDraft={(draft) => {
          setDraftResponse(draft);
          setOutputLanguage(draft.request.outputLanguage);
          const dept = DEPARTMENTS.find((d) => d.id === draft.request.departmentId);
          if (dept) setSelectedDept(dept);
        }}
        onDeleteDraft={handleDeleteDraftFromHistory}
        onClearAll={handleClearAllHistory}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <LegalAdviceModal
        isOpen={legalAdviceModal.isOpen}
        onClose={() =>
          setLegalAdviceModal((prev) => ({ ...prev, isOpen: false }))
        }
        question={legalAdviceModal.question}
        answer={legalAdviceModal.answer}
        isLoading={legalAdviceModal.isLoading}
      />

    </div>
  );
}

