import React, { useState } from "react";
import { DraftResponse, OutputLanguage } from "../types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { 
  Printer, 
  Copy, 
  Download, 
  Edit3, 
  Check, 
  Sparkles, 
  Bookmark, 
  AlertCircle,
  Scale,
  FileDown,
  Loader2
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
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  if (!draftResponse) {
    return (
      <div className="bg-white rounded-xl border border-black/10 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[380px] shadow-sm">
        <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-black/10 flex items-center justify-center text-[#8B735B] mb-4">
          <Scale className="w-7 h-7 text-[#8B735B]" />
        </div>
        <label className="text-[10px] uppercase tracking-widest font-bold text-[#8B735B] block mb-1">
          04. Official Draft & Preview
        </label>
        <h3 className="text-base font-bold text-[#1C1C1C] font-urdu mb-2">
          قانونی درخواست کا باضابطہ پیش نظارہ (Document Preview)
        </h3>
        <p className="text-xs text-[#1C1C1C]/60 font-urdu max-w-md leading-relaxed">
          اپنا متعلقہ محکمہ منتخب کریں اور شکایت کی تفصیلات درج کر کے "باضابطہ قانونی درخواست تیار کریں" کے بٹن پر کلک کریں۔ یہاں قانونی کاغذ پر باضابطہ درخواست تیار ظاہر ہو گی۔
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

  const handleExportPdf = async () => {
    const paperElement = document.getElementById("printable-document-paper");
    if (!paperElement) return;

    setIsPdfGenerating(true);
    try {
      const canvas = await html2canvas(paperElement, {
        scale: 2.5, // Crisp resolution for Urdu & English text
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const deptId = draftResponse?.request.departmentId || "Draft";
      const dateStr = new Date().toISOString().slice(0, 10);
      pdf.save(`Arzi_Navees_Application_${deptId}_${dateStr}.pdf`);
    } catch (error) {
      console.error("PDF Export failed:", error);
      alert("PDF ایکسپورٹ میں دشواری پیش آئی۔ برائے کرم پرنٹ کے اختیارات سے Save as PDF کا استعمال کریں۔");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([currentText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `Arzi_Navees_${draftResponse.request.departmentId}_${new Date().toISOString().slice(0, 10)}.txt`;
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
    <div className="space-y-5">
      
      {/* Section Label & Top Action Ribbon (Hidden when printing) */}
      <div className="bg-white rounded-xl border border-black/10 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 no-print shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8B735B]" />
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#8B735B]">
              04. Official Draft Preview (پیش نظارہ خاکہ)
            </label>
          </div>
          <span className="text-xs text-[#1C1C1C]/70 font-urdu">
            خاکہ تیار ہے۔ آپ ترمیم کر سکتے ہیں یا فوری PDF/پرنٹ حاصل کر سکتے ہیں۔
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          
          <button
            type="button"
            onClick={isEditing ? saveEdit : startEdit}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#FAF9F6] hover:bg-stone-100 text-[#1C1C1C] border border-black/10 transition-colors font-urdu"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#8B735B]" />
            <span>{isEditing ? "محفوظ کریں (Save)" : "ترمیم کریں (Edit)"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#FAF9F6] hover:bg-stone-100 text-[#1C1C1C] border border-black/10 transition-colors font-urdu"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">کاپی ہو گیا!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#8B735B]" />
                <span>کاپی کریں</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#FAF9F6] hover:bg-stone-100 text-[#1C1C1C] border border-black/10 transition-colors font-urdu"
          >
            <Download className="w-3.5 h-3.5 text-[#8B735B]" />
            <span>TXT</span>
          </button>

          <button
            type="button"
            onClick={() => onSaveToHistory(draftResponse)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors font-urdu ${
              isSaved
                ? "bg-[#8B735B]/10 text-[#8B735B] border-[#8B735B]/30"
                : "bg-[#FAF9F6] hover:bg-stone-100 text-[#1C1C1C] border-black/10"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-[#8B735B] text-[#8B735B]" : "text-[#8B735B]"}`} />
            <span>{isSaved ? "محفوظ ہے" : "محفوظ کریں"}</span>
          </button>

          {/* Export to PDF Direct Button */}
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={isPdfGenerating}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-[#8B735B] hover:bg-[#735F4B] text-white shadow-sm transition-all font-urdu"
          >
            {isPdfGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>PDF ڈاؤن لوڈ ہو رہا ہے...</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5 text-amber-100" />
                <span>Export to PDF</span>
              </>
            )}
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#1C1C1C] hover:bg-stone-800 text-white transition-all font-urdu"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>پرنٹ کریں</span>
          </button>

        </div>
      </div>

      {/* Main Printable Editorial Document Paper Canvas */}
      <div 
        id="printable-document-paper"
        className="bg-white text-[#1C1C1C] rounded-xl border border-black/10 p-8 sm:p-14 document-shadow legal-paper relative overflow-hidden my-2"
      >
        
        {/* Editorial Official Stamp Header Pattern */}
        <div className="text-center pb-6 mb-8 border-b-2 border-[#1C1C1C]">
          <div className="flex items-center justify-center gap-3 mb-1.5">
            <div className="w-7 h-7 rounded-full border border-[#8B735B] flex items-center justify-center text-[#8B735B] font-bold text-xs">
              ★
            </div>
            <h1 className="text-base sm:text-lg font-serif font-bold tracking-widest text-[#1C1C1C] uppercase">
              {isUrdu ? "اسلامی جمہوریہ پاکستان — بمسودہ باضابطہ درخواست" : "OFFICIAL ADMINISTRATIVE APPLICATION — PAKISTAN"}
            </h1>
            <div className="w-7 h-7 rounded-full border border-[#8B735B] flex items-center justify-center text-[#8B735B] font-bold text-xs">
              ★
            </div>
          </div>
          <p className="text-[10px] text-[#8B735B] font-serif uppercase tracking-[0.2em] font-semibold">
            GOVERNMENT OF PAKISTAN • PUBLIC SERVICE & GRIEVANCE RELIEF CLERK
          </p>
        </div>

        {/* Editable mode vs Text View */}
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={18}
            className="w-full bg-[#FAF9F6] border border-black/10 rounded-lg p-4 font-nastaliq text-base text-[#1C1C1C] focus:outline-none leading-loose resize-y"
          />
        ) : (
          <div
            className={`whitespace-pre-wrap leading-relaxed text-[#1C1C1C] selection:bg-[#8B735B]/20 ${
              isUrdu ? "font-nastaliq text-base text-right" : "font-serif text-sm text-left"
            }`}
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
            تاریخ تحریر: {draftResponse.request.applicant.date || new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </div>

      {/* Supplemental Legal Notes & Attachments Checklist (Hidden on Print) */}
      {draftResponse.legalNotes && (
        <div className="bg-white rounded-xl border border-black/10 p-6 no-print shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-[#8B735B]" />
            <h3 className="text-xs font-bold text-[#1C1C1C] font-urdu uppercase tracking-wider">
              ضروری دستاویزات و قانونی تجاویز (Required Attachments & Action Checklist)
            </h3>
          </div>

          <div className="bg-[#FAF9F6] p-4 rounded-lg border border-black/5 text-xs text-[#1C1C1C] font-urdu leading-relaxed whitespace-pre-line">
            {draftResponse.legalNotes}
          </div>

          {/* Ask Follow-up Legal Question Input */}
          <div className="mt-5 pt-4 border-t border-black/5">
            <label className="block text-xs font-semibold text-[#1C1C1C] mb-1.5 font-urdu">
              کیا آپ کو اس درخواست کی جمع آوری یا اگلی قانونی کارروائی کے متعلق کوئی سوال ہے؟
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="مثلاً: اگر ایس ایچ او درخواست وصول کرنے سے انکار کر دے تو کیا کریں؟"
                className="flex-1 bg-[#FAF9F6] border border-black/10 focus:border-[#8B735B] rounded-lg py-2 px-3 text-xs text-[#1C1C1C] font-urdu placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (customQuestion.trim()) {
                    onAskLegalQuestion(customQuestion);
                    setCustomQuestion("");
                  }
                }}
                className="px-4 py-2 rounded-lg bg-[#8B735B] hover:bg-[#735F4B] text-white font-semibold text-xs font-urdu shadow-sm transition-colors whitespace-nowrap"
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

