import React, { useState, useEffect } from "react";
import { OutputLanguage } from "../types";
import { 
  Mic, 
  MicOff, 
  FileEdit, 
  Send, 
  Languages, 
  Eraser, 
  Sparkles,
  AlertCircle
} from "lucide-react";

interface ComplaintInputProps {
  rawComplaint: string;
  onComplaintChange: (value: string) => void;
  outputLanguage: OutputLanguage;
  onLanguageChange: (lang: OutputLanguage) => void;
  onSubmitDraft: () => void;
  isLoading: boolean;
  departmentName: string;
}

export const ComplaintInput: React.FC<ComplaintInputProps> = ({
  rawComplaint,
  onComplaintChange,
  outputLanguage,
  onLanguageChange,
  onSubmitDraft,
  isLoading,
  departmentName,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "ur-PK"; // Default to Urdu/Pakistani spoken accent

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
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center space-x-2 space-x-reverse">
          <FileEdit className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm sm:text-base font-semibold text-slate-200 font-urdu">
            ۳. شکایت / واقعہ کی خام تفصیلات درج کریں (Raw Complaint Detail)
          </h2>
        </div>

        {/* Output Language Toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <Languages className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
          <span className="text-xs text-slate-400 ml-2 font-urdu">زبان:</span>
          <button
            type="button"
            onClick={() => onLanguageChange("Urdu")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors font-urdu ${
              outputLanguage === "Urdu"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            اردو (Urdu)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("English")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors font-sans ${
              outputLanguage === "English"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            English
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-2 font-urdu">
        آپ رومن اردو، سلیس اردو یا ٹوٹی پھوٹی انگریزی میں اپنا مسئلہ بیان کر سکتے ہیں۔ نظام خودکار طریقے سے باضابطہ قانونی و انتظامی درخواست تیار کرے گا۔
      </p>

      {/* Main Textarea Area */}
      <div className="relative">
        <textarea
          value={rawComplaint}
          onChange={(e) => onComplaintChange(e.target.value)}
          placeholder={`مثال کے طور پر:\n"Mera bijli ka meter LESCO ne overbilling ki waja se kaat diya hai. Bill 45 hazar aya hai jabke ghar mein sirf do pankhe aur ek fridge chal raha hai. Mianwali sub-division office gaye lekin SDO sahab ne sunwai nahi ki. Kindly bill sahi kar ke meter bahal kia jaye..."`}
          rows={5}
          className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none font-urdu leading-relaxed resize-y"
        />

        {/* Voice Dictation Button & Clear */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
          {speechSupported && (
            <button
              type="button"
              onClick={toggleRecording}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isRecording
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
              title="بول کر متن درج کریں (Voice Dictation)"
            >
              {isRecording ? (
                <>
                  <MicOff className="w-3.5 h-3.5" />
                  <span className="font-urdu">ریکارڈنگ جاری...</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-urdu">بول کر لکھیں</span>
                </>
              )}
            </button>
          )}

          {rawComplaint && (
            <button
              type="button"
              onClick={() => onComplaintChange("")}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs"
              title="متن صاف کریں"
            >
              <Eraser className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Length count & Submit button */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 font-urdu">
          حروف کی تعداد: <span className="text-slate-300">{rawComplaint.length}</span>
        </div>

        <button
          type="button"
          onClick={onSubmitDraft}
          disabled={isLoading || !rawComplaint.trim()}
          className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm font-urdu flex items-center justify-center space-x-2 space-x-reverse transition-all duration-200 ${
            isLoading || !rawComplaint.trim()
              ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
              : "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/30 active:scale-[0.98]"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
              <span>درخواست تحریر کی جا رہی ہے...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 ml-2 text-emerald-200" />
              <span>باضابطہ قانونی درخواست تحریر کریں</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
