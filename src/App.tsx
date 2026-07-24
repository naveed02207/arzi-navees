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
import { AlertCircle, Scale, Sparkles, CheckCircle, RotateCcw } from "lucide-react";

const STORAGE_KEY = "arzi_navees_saved_drafts";

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

  // Load saved history on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedDrafts(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load history from storage", e);
    }
  }, []);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-urdu selection:bg-emerald-500 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={savedDrafts.length}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero Section Banner */}
        <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-900/50 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-xl no-print">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/40 text-xs font-semibold mb-2">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>عریضہ نویس • پاکستانی قانونی و انتظامی درخواستی سروس</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-nastaliq text-slate-100 tracking-wide">
                اپنی غیر باضابطہ شکایت کو باضابطہ اور قانونی درخواست میں تبدیل کریں
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-urdu mt-1 max-w-2xl leading-relaxed">
                رومن اردو، عام اردو یا انگریزی میں اپنا مسئلہ درج کریں۔ یہ نظام خودکار طور پر تھانہ، واپڈا، نادرا، واسا یا دیگر تمام سرکاری محکموں کی تسلیم شدہ قانونی زبان و ترتیب میں درخواست تیار کرے گا۔
              </p>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse self-start md:self-auto shrink-0">
              <button
                onClick={() => {
                  setRawComplaint("");
                  setDraftResponse(null);
                }}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/80 transition-colors"
                title="تمام فارم نیا کریں"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>نیا فارم</span>
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
            onChange={setApplicant}
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
          <div className="bg-red-950/80 border border-red-800/80 p-4 rounded-2xl flex items-center space-x-3 space-x-reverse text-red-200 text-xs sm:text-sm font-urdu no-print">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
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

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 mt-12 text-center text-xs text-slate-500 font-urdu no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            عریضہ نویس (Arzi-Navees) — قانونی تسلیم شدہ درخواستی فارمیٹ برائے پاکستانی شہری
          </p>
          <p className="text-[11px] text-slate-600">
            برائے اطلاع: تمام تیار کردہ فارمیٹس محض انتظامی مقاصد اور آسانی کے لیے ہیں۔
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
