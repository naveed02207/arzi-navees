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
  FileText, 
  AlertCircle,
  HelpCircle,
  Share2,
  Scale
} from "lucide-react";

interface DraftPreviewProps {
  draftResponse: DraftResponse | null;
  outputLanguage: OutputLanguage;
  onSaveToHistory: (draft: DraftResponse) => void;
  isSaved: boolean;
  onAskLegalQuestion: (question: string) => void;
}

export const DraftPreview: React.FC<DraftPreviewProps> = ({
  draftResponse,
  outputLanguage,
  onSaveToHistory,
  isSaved,
  onAskLegalQuestion,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>("");
  const [customQuestion, setCustomQuestion] = useState<string>("");

  if (!draftResponse) {
    return (
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 mb-4 shadow-inner">
          <Scale className="w-8 h-8 text-emerald-600/60" />
        </div>
        <h3 className="text-lg font-semibold text-slate-300 font-urdu mb-2">
          قانونی درخواست کا باضابطہ پیش نظارہ (Document Preview)
        </h3>
        <p className="text-xs text-slate-500 font-urdu max-w-md leading-relaxed">
          اپنا متعلقہ محکمہ منتخب کریں اور شکایت کی تفصیلات درج کر کے "باضابطہ قانونی درخواست تحریر کریں" کے بٹن پر کلک کریں۔ یہاں مکمل اور قانونی کاغذ پر تیار شدہ درخواست ظاہر ہو گی۔
        </p>
      </div>
    );
  }

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
    element.download = `Application_${draftResponse.request.departmentId}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const startEdit = () => {
    setEditedText(draftResponse.applicationText);
    setIsEditing(true);
  };

  const saveEdit = () => {
    draftResponse.applicationText = editedText;
    setIsEditing(false);
  };

  const isUrdu = outputLanguage === "Urdu";

  return (
    <div className="space-y-4">
      
      {/* Top Action Ribbon (Hidden when printing) */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-2 no-print shadow-md">
        <div className="flex items-center space-x-2 space-x-reverse text-xs text-emerald-400 font-urdu">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">درخواست کامیابی سے تیار ہے</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={isEditing ? saveEdit : startEdit}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-urdu"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            <span>{isEditing ? "محفوظ کریں (Save)" : "ترمیم کریں (Edit)"}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-urdu"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">کاپی ہو گیا!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>کاپی کریں (Copy)</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadTxt}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-urdu"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>فائل ڈاؤن لوڈ (TXT)</span>
          </button>

          <button
            onClick={() => onSaveToHistory(draftResponse)}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors font-urdu ${
              isSaved
                ? "bg-emerald-950 text-emerald-300 border-emerald-700/60"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-emerald-400 text-emerald-400" : "text-slate-400"}`} />
            <span>{isSaved ? "محفوظ ہے" : "محفوظ کریں"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all font-urdu"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>پرنٹ / PDF نکالیں</span>
          </button>

        </div>
      </div>

      {/* Main Printable Legal Stamp Paper Canvas */}
      <div className="bg-white text-slate-900 rounded-xl border-2 border-slate-300 p-6 sm:p-10 shadow-2xl legal-paper relative overflow-hidden">
        
        {/* Decorative Stamp Header Pattern */}
        <div className="text-center pb-6 mb-6 border-b-2 border-slate-900/80">
          <div className="flex items-center justify-center space-x-3 mb-1">
            <div className="w-8 h-8 rounded-full border border-emerald-900 flex items-center justify-center text-emerald-900 font-bold text-xs">
              ★
            </div>
            <h1 className="text-lg sm:text-xl font-bold font-serif tracking-widest text-slate-900 uppercase">
              {isUrdu ? "اسلامی جمہوریہ پاکستان - بمسودہ درخواست" : "OFFICIAL ADMINISTRATIVE APPLICATION - PAKISTAN"}
            </h1>
            <div className="w-8 h-8 rounded-full border border-emerald-900 flex items-center justify-center text-emerald-900 font-bold text-xs">
              ★
            </div>
          </div>
          <p className="text-[11px] text-slate-600 font-serif uppercase tracking-wider">
            GOVERNMENT OF PAKISTAN • PUBLIC COMPLAINT & RELIEF APPLICATION
          </p>
        </div>

        {/* Editable mode vs Text View */}
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={18}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-4 font-nastaliq text-base text-slate-900 focus:outline-none leading-loose resize-y"
          />
        ) : (
          <div
            className={`whitespace-pre-wrap leading-relaxed text-slate-900 selection:bg-amber-200 ${
              isUrdu ? "font-nastaliq text-base text-right" : "font-serif text-sm text-left"
            }`}
            style={{ direction: isUrdu ? "rtl" : "ltr" }}
          >
            {currentText}
          </div>
        )}

        {/* Official Footer Watermark Notice */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-serif">
          <div>
            دستیاب بذریعہ: عریضہ نویس (Arzi-Navees Legal Clerk System)
          </div>
          <div>
            تاریخ تحریر: {draftResponse.request.applicant.date || new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </div>

      {/* Supplemental Legal Notes & Attachments Checklist (Hidden on Print) */}
      {draftResponse.legalNotes && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 no-print shadow-lg">
          <div className="flex items-center space-x-2 space-x-reverse mb-3">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-200 font-urdu">
              ضروری دستاویزات و قانونی رہنمائی (Required Documents & Legal Guidance)
            </h3>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 font-urdu leading-relaxed whitespace-pre-line">
            {draftResponse.legalNotes}
          </div>

          {/* Ask Follow-up Legal Question Input */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <label className="block text-xs font-medium text-slate-400 mb-1 font-urdu">
              کیا آپ کو اس درخواست کی جمع آوری یا اگلی کارروائی کے متعلق کوئی سوال ہے؟
            </label>
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="مثلاً: اگر ایس ایچ او درخواست لینے سے انکار کر دے تو کیا کریں؟"
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 px-3 text-xs text-slate-200 font-urdu placeholder-slate-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (customQuestion.trim()) {
                    onAskLegalQuestion(customQuestion);
                    setCustomQuestion("");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium text-xs font-urdu border border-slate-700 whitespace-nowrap"
              >
                سوال پوچھیں
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
