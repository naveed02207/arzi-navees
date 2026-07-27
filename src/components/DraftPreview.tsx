import React, { useState } from "react";
import { DraftResponse, OutputLanguage } from "../types";
import {
  Printer,
  Copy,
  Download,
  Edit3,
  Check,
  Sparkles,
  Bookmark,
  AlertCircle,
  FileDown,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface DraftPreviewProps {
  draftResponse: DraftResponse | null;
  outputLanguage: OutputLanguage;
  onSaveToHistory: (draft: DraftResponse) => void;
  isSaved: boolean;
  onAskLegalQuestion: (question: string) => void;
  printMargin: string;
}

export const DraftPreview: React.FC<DraftPreviewProps> = React.memo(({
  draftResponse,
  outputLanguage: _outputLanguage,
  onSaveToHistory,
  isSaved,
  onAskLegalQuestion,
  printMargin,
}) => {
  const { getTextClass } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");

  if (!draftResponse) return null;

  const isUrdu = draftResponse.request.outputLanguage === "Urdu";
  const currentText = isEditing ? editedText : draftResponse.applicationText;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([currentText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `Application_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h2
              className={getTextClass(
                "text-base sm:text-lg font-bold text-gray-900 tracking-tight",
              )}
            >
              Official Draft Ready
            </h2>
            <p className={getTextClass("text-xs text-emerald-700 font-medium")}>
              Generated in {draftResponse.request.outputLanguage}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                draftResponse.applicationText = editedText;
                setIsEditing(false);
              } else {
                setEditedText(draftResponse.applicationText);
                setIsEditing(true);
              }
            }}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 :bg-gray-700 text-gray-700 border border-gray-200 transition-colors",
            )}
          >
            {isEditing ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Save Edits</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 text-emerald-600" />
                <span>Edit Mode</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 :bg-gray-700 text-gray-700 border border-gray-200 transition-colors",
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-emerald-600" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDownloadTxt}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 :bg-gray-700 text-gray-700 border border-gray-200 transition-colors",
            )}
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>TXT</span>
          </button>
          <button
            type="button"
            onClick={() => onSaveToHistory(draftResponse)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${getTextClass("")} ${isSaved ? "bg-emerald-50 text-emerald-700 border-emerald-200 " : "bg-gray-50 hover:bg-gray-100 :bg-gray-700 text-gray-700 border-gray-200 "}`}
          >
            <Bookmark
              className={`w-4 h-4 ${isSaved ? "fill-emerald-600 text-emerald-600 " : "text-emerald-600 "}`}
            />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>

          {/* Export to PDF Direct Button */}
          <button
            type="button"
            onClick={handlePrint}
            className={getTextClass(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all",
            )}
          >
            <FileDown className="w-4 h-4 text-emerald-100" />
            <span>Export PDF</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className={getTextClass(
              "flex items-center gap-1 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-white hover:bg-black text-white transition-all print:hidden",
            )}
          >
            <Printer className="w-4 h-4" /> <span>Print</span>
          </button>
        </div>
      </div>

      {/* Main Printable Editorial Document Paper Canvas */}
      <div
        id="printable-document-paper"
        className={`bg-white text-gray-900 rounded-xl border border-gray-200 p-8 sm:p-14 document-shadow legal-paper relative my-2 shadow-xl print:block print:w-full print:absolute print:top-0 print:left-0 print:bg-white print:text-black print:shadow-none ${printMargin === "stamp" ? "print:pt-[150mm]" : "print:pt-8"}`}
      >
        {/* Editorial Official Stamp Header Pattern */}
        <div className="text-center pb-6 mb-8 border-b-2 border-gray-900">
          <div className="flex items-center justify-center gap-3 mb-1.5">
            <div className="w-7 h-7 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-700 font-bold text-xs">
              ★
            </div>
            <h1 className="text-base sm:text-lg font-serif font-bold tracking-widest text-gray-900 uppercase">
              {isUrdu
                ? "اسلامی جمہوریہ پاکستان — بمسودہ باضابطہ درخواست"
                : "OFFICIAL ADMINISTRATIVE APPLICATION — PAKISTAN"}
            </h1>
            <div className="w-7 h-7 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-700 font-bold text-xs">
              ★
            </div>
          </div>
          <p className="text-[10px] text-emerald-700 font-serif uppercase tracking-[0.2em] font-semibold">
            GOVERNMENT OF PAKISTAN • PUBLIC SERVICE & GRIEVANCE RELIEF CLERK
          </p>
        </div>

        {/* Editable mode vs Text View */}
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={18}
            className={`w-full bg-[#FAF9F6] border border-black/10 rounded-lg p-4 text-gray-900 focus:outline-none resize-y ${isUrdu ? "urdu-text" : "font-serif text-sm text-left leading-relaxed whitespace-pre-wrap"}`}
          />
        ) : (
          <div
            className={`whitespace-pre-wrap text-gray-900 selection:bg-[#8B735B]/20 ${isUrdu ? "urdu-text" : "font-serif text-sm text-start leading-relaxed"}`}
            style={{ direction: isUrdu ? "rtl" : "ltr" }}
          >
            {currentText}
          </div>
        )}

        {/* Official Footer Watermark Notice */}
        <div className="mt-14 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-serif">
          <div>
            دستیاب بذریعہ: عریضہ نویس (Arzi-Navees Editorial Drafting Suite)
          </div>
          <div>
            تاریخ تحریر:{" "}
            {draftResponse.request.applicant.date ||
              new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </div>

      {/* Supplemental Legal Notes & Attachments Checklist (Hidden on Print) */}
      {draftResponse.legalNotes && (
        <div className="bg-white rounded-xl shadow-md p-6 print:hidden transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-emerald-600 " />
            <h3
              className={getTextClass(
                "text-xs font-bold text-gray-900 uppercase tracking-wider",
              )}
            >
              Required Attachments & Action Checklist
            </h3>
          </div>
          <div
            className={getTextClass(
              "bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs text-gray-800 leading-relaxed whitespace-pre-line",
            )}
          >
            {draftResponse.legalNotes}
          </div>

          {/* Ask Follow-up Legal Question Input */}
          <div className="mt-5 pt-4 border-t border-gray-100 ">
            <label
              className={getTextClass(
                "block text-xs font-semibold text-gray-900 mb-1.5",
              )}
            >
              Do you have any questions about submitting this application?
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="e.g. What if the SHO refuses to accept the application?"
                className={getTextClass(
                  "flex-1 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2 px-3 text-xs text-gray-900 placeholder:text-gray-400 :text-gray-500 focus:outline-none transition-colors",
                )}
              />
              <button
                type="button"
                onClick={() => {
                  if (customQuestion.trim()) {
                    onAskLegalQuestion(customQuestion);
                    setCustomQuestion("");
                  }
                }}
                className={getTextClass(
                  "px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap",
                )}
              >
                Ask Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
