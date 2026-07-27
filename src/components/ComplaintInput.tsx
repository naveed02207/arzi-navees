import React, { useState, useEffect } from "react";
import { OutputLanguage } from "../types";
import { Mic, MicOff, Languages, Eraser, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
interface ComplaintInputProps {
  rawComplaint: string;
  onComplaintChange: (value: string) => void;
  outputLanguage: OutputLanguage;
  onLanguageChange: (lang: OutputLanguage) => void;
  onSubmitDraft: () => void;
  isLoading: boolean;
  departmentName: string;
}
export const ComplaintInput: React.FC<ComplaintInputProps> = React.memo(({
  rawComplaint,
  onComplaintChange,
  outputLanguage,
  onLanguageChange,
  onSubmitDraft,
  isLoading,
  departmentName: _departmentName,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const { t, getTextClass } = useLanguage();
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(null);
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "ur-PK";
      rec.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          onComplaintChange(transcript);
        }
      };
      rec.onerror = (err: any) => {
        console.error("Speech recognition error", err);
        setIsRecording(false);
      };
      rec.onend = () => {
        setIsRecording(false);
      };
      setRecognition(rec);
    }
  }, []);
  const toggleRecording = () => {
    if (!recognition) return;
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      try {
        recognition.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Could not start recording", err);
      }
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      {" "}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        {" "}
        <div>
          {" "}
          <label
            className={getTextClass(
              "text-[10px] uppercase tracking-widest font-bold text-emerald-700 block",
            )}
          >
            {" "}
            {t("lbl_grievance")}{" "}
          </label>{" "}
          <p className={getTextClass("text-xs text-gray-500 mt-0.5")}>
            {" "}
            {t("txt_describe_issue")}{" "}
          </p>{" "}
        </div>{" "}
        {/* Output Language Toggle */}{" "}
        <div className="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-200 self-start sm:self-auto">
          {" "}
          <Languages className="w-4 h-4 text-emerald-600 ml-2 mr-1" />{" "}
          <span className="text-[11px] text-gray-600 ml-2 font-urdu font-medium">
            {t("txt_output_lang_label")}
          </span>{" "}
          <button
            type="button"
            onClick={() => onLanguageChange("Urdu")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all font-urdu ${outputLanguage === "Urdu" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            {" "}
            اردو (Urdu){" "}
          </button>{" "}
          <button
            type="button"
            onClick={() => onLanguageChange("English")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all font-sans ${outputLanguage === "English" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            {" "}
            English{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {/* Main Textarea Area */}{" "}
      <div className="relative mt-2">
        {" "}
        <textarea
          value={rawComplaint}
          onChange={(e) => onComplaintChange(e.target.value)}
          placeholder={`مثال کے طور پر:\n"Mera bijli ka meter LESCO ne overbilling ki waja se kaat diya hai. Bill 45 hazar aya hai jabke ghar mein sirf do pankhe aur ek fridge chal raha hai. Mianwali sub-division office gaye lekin SDO sahab ne sunwai nahi ki. Kindly bill sahi kar ke meter bahal kia jaye..."`}
          rows={5}
          className={getTextClass(
            "w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-2xl p-4 text-sm text-gray-900 placeholder:text-gray-400 :text-gray-500 focus:outline-none leading-relaxed resize-y transition-colors",
          )}
        />{" "}
        {/* Voice Dictation Button & Clear */}{" "}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          {" "}
          {speechSupported && (
            <button
              type="button"
              onClick={toggleRecording}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isRecording ? "bg-red-600 text-white animate-pulse" : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm"}`}
              title="بول کر متن درج کریں (Voice Dictation)"
            >
              {" "}
              {isRecording ? (
                <>
                  {" "}
                  <MicOff className="w-4 h-4" />{" "}
                  <span className="font-urdu">{t("txt_recording")}</span>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Mic className="w-4 h-4 text-emerald-600" />{" "}
                  <span className="font-urdu">
                    {t("txt_dictate")}
                  </span>{" "}
                </>
              )}{" "}
            </button>
          )}{" "}
          {rawComplaint && (
            <button
              type="button"
              onClick={() => onComplaintChange("")}
              className="p-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-700 border border-gray-200 text-xs shadow-sm transition-colors"
              title={t("btn_clear_text")}
            >
              {" "}
              <Eraser className="w-4 h-4" />{" "}
            </button>
          )}{" "}
        </div>{" "}
      </div>{" "}
      {/* Length count & Submit button */}{" "}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        {" "}
        <div className="text-xs text-gray-500 font-urdu">
          {" "}
          {t("txt_char_count")}{" "}
          <span className="font-bold text-gray-900">
            {rawComplaint.length}
          </span>{" "}
        </div>{" "}
        <button
          type="button"
          onClick={onSubmitDraft}
          disabled={isLoading || !rawComplaint.trim()}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-lg font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ease-in-out ${getTextClass("")} ${isLoading || !rawComplaint.trim() ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300 " : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:scale-[0.98]"}`}
        >
          {" "}
          {isLoading ? (
            <>
              {" "}
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />{" "}
              <span>{t("txt_drafting")}</span>{" "}
            </>
          ) : (
            <>
              {" "}
              <Sparkles className="w-4 h-4 text-emerald-100" />{" "}
              <span>{t("btn_generate")}</span>{" "}
            </>
          )}{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
});
