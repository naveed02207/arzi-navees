import React, { useState, useEffect } from "react";
import { OutputLanguage } from "../types";
import { 
  Mic, 
  MicOff, 
  Languages, 
  Eraser, 
  Sparkles
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
    <div className="bg-white rounded-xl border border-black/10 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <label className="text-[10px] uppercase tracking-widest font-bold text-[#8B735B] block">
            03. Raw Grievance (شکایت / واقعہ کی خام تفصیلات)
          </label>
          <p className="text-xs text-[#1C1C1C]/60 font-urdu mt-0.5">
            رومن اردو، سادہ اردو یا ٹوٹی پھوٹی انگریزی میں بغیر خوف و جھجھک اپنا مسئلہ لکھیں
          </p>
        </div>

        {/* Output Language Toggle */}
        <div className="flex items-center bg-[#FAF9F6] p-1 rounded-lg border border-black/10 self-start sm:self-auto">
          <Languages className="w-3.5 h-3.5 text-[#8B735B] ml-2 mr-1" />
          <span className="text-[11px] text-[#1C1C1C]/70 ml-2 font-urdu font-medium">زبان خاکہ:</span>
          <button
            type="button"
            onClick={() => onLanguageChange("Urdu")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all font-urdu ${
              outputLanguage === "Urdu"
                ? "bg-[#8B735B] text-white shadow-sm"
                : "text-[#1C1C1C]/70 hover:text-[#1C1C1C]"
            }`}
          >
            اردو (Urdu)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("English")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all font-sans ${
              outputLanguage === "English"
                ? "bg-[#8B735B] text-white shadow-sm"
                : "text-[#1C1C1C]/70 hover:text-[#1C1C1C]"
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Main Textarea Area */}
      <div className="relative mt-2">
        <textarea
          value={rawComplaint}
          onChange={(e) => onComplaintChange(e.target.value)}
          placeholder={`مثال کے طور پر:\n"Mera bijli ka meter LESCO ne overbilling ki waja se kaat diya hai. Bill 45 hazar aya hai jabke ghar mein sirf do pankhe aur ek fridge chal raha hai. Mianwali sub-division office gaye lekin SDO sahab ne sunwai nahi ki. Kindly bill sahi kar ke meter bahal kia jaye..."`}
          rows={5}
          className="w-full bg-[#FAF9F6] border border-black/10 focus:border-[#8B735B] rounded-xl p-4 text-sm text-[#1C1C1C] placeholder:text-stone-400 focus:outline-none font-urdu leading-relaxed resize-y transition-colors"
        />

        {/* Voice Dictation Button & Clear */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          {speechSupported && (
            <button
              type="button"
              onClick={toggleRecording}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isRecording
                  ? "bg-rose-600 text-white animate-pulse"
                  : "bg-white hover:bg-stone-100 text-[#1C1C1C] border border-black/10 shadow-sm"
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
                  <Mic className="w-3.5 h-3.5 text-[#8B735B]" />
                  <span className="font-urdu">بول کر لکھیں (Urdu Dictation)</span>
                </>
              )}
            </button>
          )}

          {rawComplaint && (
            <button
              type="button"
              onClick={() => onComplaintChange("")}
              className="p-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-500 hover:text-stone-800 border border-black/10 text-xs shadow-sm"
              title="متن صاف کریں"
            >
              <Eraser className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Length count & Submit button */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-stone-500 font-urdu">
          حروف کی تعداد: <span className="font-bold text-[#1C1C1C]">{rawComplaint.length}</span>
        </div>

        <button
          type="button"
          onClick={onSubmitDraft}
          disabled={isLoading || !rawComplaint.trim()}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-lg font-bold text-xs font-urdu uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-all duration-200 ${
            isLoading || !rawComplaint.trim()
              ? "bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300"
              : "bg-[#8B735B] hover:bg-[#735F4B] text-white shadow-md active:scale-[0.99]"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
              <span>قانونی خاکہ تیار ہو رہا ہے...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>باضابطہ قانونی درخواست تیار کریں</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

