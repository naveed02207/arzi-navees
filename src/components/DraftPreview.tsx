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
  Loader2,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
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
  const { t, getTextClass } = useLanguage();
  if (!draftResponse) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[380px] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        {" "}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-4 shadow-sm">
          {" "}
          <Scale className="w-8 h-8 text-emerald-700 " />{" "}
        </div>{" "}
        <label
          className={getTextClass(
            "text-[10px] uppercase tracking-widest font-bold text-emerald-700 block mb-1",
          )}
        >
          {" "}
          {t("preview_title")}{" "}
        </label>{" "}
        <h3 className={getTextClass("text-base font-bold text-gray-900 mb-2")}>
          {" "}
          Document Preview{" "}
        </h3>{" "}
        <p
          className={getTextClass(
            "text-xs text-gray-500 max-w-md leading-relaxed",
          )}
        >
          {" "}
          Select a department, provide your details, and submit your raw
          grievance to generate the official application here.{" "}
        </p>{" "}
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
        scale: 2.5,
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
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
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
      alert(
        "PDF ایکسپورٹ میں دشواری پیش آئی۔ برائے کرم پرنٹ کے اختیارات سے Save as PDF کا استعمال کریں۔",
      );
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
      {" "}
      {/* Section Label & Top Action Ribbon (Hidden when printing) */}{" "}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 no-print transition-all duration-300 hover:shadow-lg">
        {" "}
        <div>
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <Sparkles className="w-4 h-4 text-emerald-600 " />{" "}
            <label
              className={getTextClass(
                "text-[10px] uppercase tracking-widest font-bold text-emerald-700 ",
              )}
            >
              {" "}
              {t("preview_title")}{" "}
            </label>{" "}
          </div>{" "}
          <span className={getTextClass("text-xs text-gray-500 ")}>
            {" "}
            Your draft is ready. Edit, copy, or print.{" "}
          </span>{" "}
        </div>{" "}
        <div className="flex flex-wrap items-center gap-2">
          {" "}
          <button
            type="button"
            onClick={isEditing ? saveEdit : startEdit}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 :bg-gray-700 text-gray-700 border border-gray-200 transition-colors",
            )}
          >
            {" "}
            <Edit3 className="w-4 h-4 text-emerald-600 " />{" "}
            <span>{isEditing ? "Save" : "Edit"}</span>{" "}
          </button>{" "}
          <button
            type="button"
            onClick={handleCopy}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 :bg-gray-700 text-gray-700 border border-gray-200 transition-colors",
            )}
          >
            {" "}
            {copied ? (
              <>
                {" "}
                <Check className="w-4 h-4 text-emerald-600 " />{" "}
                <span className="text-emerald-700 ">Copied!</span>{" "}
              </>
            ) : (
              <>
                {" "}
                <Copy className="w-4 h-4 text-emerald-600 " />{" "}
                <span>Copy</span>{" "}
              </>
            )}{" "}
          </button>{" "}
          <button
            type="button"
            onClick={handleDownloadTxt}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 :bg-gray-700 text-gray-700 border border-gray-200 transition-colors",
            )}
          >
            {" "}
            <Download className="w-4 h-4 text-emerald-600 " />{" "}
            <span>TXT</span>{" "}
          </button>{" "}
          <button
            type="button"
            onClick={() => onSaveToHistory(draftResponse)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${getTextClass("")} ${isSaved ? "bg-emerald-50 text-emerald-700 border-emerald-200 " : "bg-gray-50 hover:bg-gray-100 :bg-gray-700 text-gray-700 border-gray-200 "}`}
          >
            {" "}
            <Bookmark
              className={`w-4 h-4 ${isSaved ? "fill-emerald-600 text-emerald-600 " : "text-emerald-600 "}`}
            />{" "}
            <span>{isSaved ? "Saved" : "Save"}</span>{" "}
          </button>{" "}
          {/* Export to PDF Direct Button */}{" "}
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={isPdfGenerating}
            className={getTextClass(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all",
            )}
          >
            {" "}
            {isPdfGenerating ? (
              <>
                {" "}
                <Loader2 className="w-4 h-4 animate-spin" />{" "}
                <span>Exporting...</span>{" "}
              </>
            ) : (
              <>
                {" "}
                <FileDown className="w-4 h-4 text-emerald-100" />{" "}
                <span>Export PDF</span>{" "}
              </>
            )}{" "}
          </button>{" "}
          {/* Print Button */}{" "}
          <button
            type="button"
            onClick={handlePrint}
            className={getTextClass(
              "flex items-center gap-1 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-white hover:bg-black text-white transition-all",
            )}
          >
            {" "}
            <Printer className="w-4 h-4" /> <span>Print</span>{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {/* Main Printable Editorial Document Paper Canvas */}{" "}
      <div
        id="printable-document-paper"
        className="bg-white text-gray-900 rounded-xl border border-gray-200 p-8 sm:p-14 document-shadow legal-paper relative overflow-hidden my-2 shadow-xl"
      >
        {" "}
        {/* Editorial Official Stamp Header Pattern */}{" "}
        <div className="text-center pb-6 mb-8 border-b-2 border-gray-900">
          {" "}
          <div className="flex items-center justify-center gap-3 mb-1.5">
            {" "}
            <div className="w-7 h-7 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-700 font-bold text-xs">
              {" "}
              ★{" "}
            </div>{" "}
            <h1 className="text-base sm:text-lg font-serif font-bold tracking-widest text-gray-900 uppercase">
              {" "}
              {isUrdu
                ? "اسلامی جمہوریہ پاکستان — بمسودہ باضابطہ درخواست"
                : "OFFICIAL ADMINISTRATIVE APPLICATION — PAKISTAN"}{" "}
            </h1>{" "}
            <div className="w-7 h-7 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-700 font-bold text-xs">
              {" "}
              ★{" "}
            </div>{" "}
          </div>{" "}
          <p className="text-[10px] text-emerald-700 font-serif uppercase tracking-[0.2em] font-semibold">
            {" "}
            GOVERNMENT OF PAKISTAN • PUBLIC SERVICE & GRIEVANCE RELIEF
            CLERK{" "}
          </p>{" "}
        </div>{" "}
        {/* Editable mode vs Text View */}{" "}
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={18}
            className={`w-full bg-[#FAF9F6] border border-black/10 rounded-lg p-4 text-gray-900 focus:outline-none resize-y ${isUrdu ? "urdu-text" : "font-serif text-sm text-left leading-relaxed whitespace-pre-wrap"}`}
          />
        ) : (
          <div
            className={`whitespace-pre-wrap text-gray-900 selection:bg-[#8B735B]/20 ${isUrdu ? "urdu-text" : "font-serif text-sm text-left leading-relaxed"}`}
            style={{ direction: isUrdu ? "rtl" : "ltr" }}
          >
            {" "}
            {currentText}{" "}
          </div>
        )}{" "}
        {/* Official Footer Watermark Notice */}{" "}
        <div className="mt-14 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-serif">
          {" "}
          <div>
            {" "}
            دستیاب بذریعہ: عریضہ نویس (Arzi-Navees Editorial Drafting
            Suite){" "}
          </div>{" "}
          <div>
            {" "}
            تاریخ تحریر:{" "}
            {draftResponse.request.applicant.date ||
              new Date().toISOString().slice(0, 10)}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Supplemental Legal Notes & Attachments Checklist (Hidden on Print) */}{" "}
      {draftResponse.legalNotes && (
        <div className="bg-white rounded-xl shadow-md p-6 no-print transition-all duration-300 hover:shadow-lg">
          {" "}
          <div className="flex items-center gap-2 mb-3">
            {" "}
            <AlertCircle className="w-5 h-5 text-emerald-600 " />{" "}
            <h3
              className={getTextClass(
                "text-xs font-bold text-gray-900 uppercase tracking-wider",
              )}
            >
              {" "}
              Required Attachments & Action Checklist{" "}
            </h3>{" "}
          </div>{" "}
          <div
            className={getTextClass(
              "bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs text-gray-800 leading-relaxed whitespace-pre-line",
            )}
          >
            {" "}
            {draftResponse.legalNotes}{" "}
          </div>{" "}
          {/* Ask Follow-up Legal Question Input */}{" "}
          <div className="mt-5 pt-4 border-t border-gray-100 ">
            {" "}
            <label
              className={getTextClass(
                "block text-xs font-semibold text-gray-900 mb-1.5",
              )}
            >
              {" "}
              Do you have any questions about submitting this application?{" "}
            </label>{" "}
            <div className="flex items-center gap-2">
              {" "}
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="e.g. What if the SHO refuses to accept the application?"
                className={getTextClass(
                  "flex-1 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2 px-3 text-xs text-gray-900 placeholder:text-gray-400 :text-gray-500 focus:outline-none transition-colors",
                )}
              />{" "}
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
                {" "}
                Ask Question{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};
