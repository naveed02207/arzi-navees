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
    printMargin: string;
}

export const DraftPreview: React.FC<DraftPreviewProps> = React.memo(({
  draftResponse,
  outputLanguage: _outputLanguage,
  onSaveToHistory,
  isSaved,
    printMargin,
}) => {
  const { t, getTextClass } = useLanguage();
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
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden transition-all duration-300">
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
              {t("txt_doc_ready")}
            </h2>
            <p className={getTextClass("text-xs text-emerald-700 font-medium")}>
              Generated in {draftResponse.request.outputLanguage}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">

          {/* Edit Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                // save edits logic (which was already in the component, wait, DraftPreview handles it by just toggling isEditing)
                setIsEditing(false);
              } else {
                setIsEditing(true);
              }
            }}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 text-gray-700 border border-gray-200 transition-colors"
            )}
          >
            {isEditing ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t("btn_save")}</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 text-emerald-600" />
                <span>{t("btn_edit")}</span>
              </>
            )}
          </button>
          
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 text-gray-700 border border-gray-200 transition-colors"
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t("txt_success")}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-emerald-600" />
                <span>{t("btn_copy")}</span>
              </>
            )}
          </button>
          
          {/* TXT Button */}
          <button
            type="button"
            onClick={handleDownloadTxt}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 text-gray-700 border border-gray-200 transition-colors"
            )}
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>{t("btn_txt")}</span>
          </button>
          
          {/* Save to History Button */}
          <button
            type="button"
            onClick={() => onSaveToHistory(draftResponse)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${getTextClass("")} ${isSaved ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 text-gray-700 border-gray-200"}`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-emerald-600 text-emerald-600" : "text-emerald-600"}`} />
            <span>{isSaved ? t("txt_auto_saved") : t("btn_save")}</span>
          </button>
          
          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            className={getTextClass(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
            )}
          >
            <FileDown className="w-4 h-4 text-emerald-100" />
            <span>{t("btn_export_pdf")}</span>
          </button>
          
          {/* Print Application Button */}
          <button
            type="button"
            onClick={handlePrint}
            className={getTextClass(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-gray-900 hover:bg-black text-white shadow-md transition-all print:hidden"
            )}
          >
            <Printer className="w-4 h-4 text-white" />
            <span>{t("btn_print")}</span>
          </button>

</div>
      </div>

      {/* Main Printable Editorial Document Paper Canvas */}
      <div
        id="printable-document-paper"
        className={`bg-white text-gray-900 rounded-2xl border border-gray-200 p-8 sm:p-14 document-shadow legal-paper relative my-2 shadow-xl print:block print:w-full print:bg-white print:text-black print:shadow-none ${printMargin === "stamp" ? "print:pt-[150mm]" : "print:pt-8"}`}
      >
        {/* Editorial Official Stamp Header Pattern */}
        <div className="text-center pb-6 mb-8 border-b-2 border-gray-900">
          <div className="flex items-center justify-center gap-3 mb-1.5">
            <div className="w-7 h-7 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-700 font-bold text-xs">
              ★
            </div>
            <h1 className="text-base sm:text-lg font-serif font-bold tracking-widest text-gray-900 uppercase">
              {t("doc_title")}
            </h1>
            <div className="w-7 h-7 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-700 font-bold text-xs">
              ★
            </div>
          </div>
          <p className="text-[10px] text-emerald-700 font-serif uppercase tracking-[0.2em] font-semibold">
            {t("doc_gov_pak")} • {t("doc_subtitle")}
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
            {t("txt_generated_in")} Arzi-Navees
          </div>
          <div>
            {t("doc_date")}:{" "}
            {draftResponse.request.applicant.date ||
              new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </div>

      {/* Supplemental Legal Notes & Attachments Checklist (Hidden on Print) */}
    </div>
  );
});
