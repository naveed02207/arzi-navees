import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex font-sans selection:bg-emerald-500 selection:text-white">
      
      <Sidebar 
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={savedDrafts.length}
      />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Top Bar Navigation */}
        <Header
          onOpenHistory={() => setIsHistoryOpen(true)}
          historyCount={savedDrafts.length}
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 space-y-8">
          
          {/* Editorial Hero Banner */}
          <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl no-print">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold font-sans">
                  <Scale className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Official Drafting Suite</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                  Arzi-Navees (عریضہ نویس)
                </h1>
                <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                  Transform informal complaints into official, legally sound applications. Select a department, provide your details, and describe your issue.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setRawComplaint("");
                    setDraftResponse(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md uppercase tracking-wider"
                  title="Reset Form"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-600" />
                  <span>Reset Form</span>
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
      <footer className="bg-white border-t border-gray-200 py-6 mt-16 text-center text-xs text-gray-500 font-sans no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            عریضہ نویس (Arzi-Navees) — Official Drafts for Pakistan
          </p>
          <p className="text-[11px] text-gray-400 font-semibold">
            © 2026 Arzi-Navees Official
          </p>
        </div>
      </footer>
      </div>

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

