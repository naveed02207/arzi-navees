import React from "react";
import { X, Sparkles, HelpCircle } from "lucide-react";

interface LegalAdviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  answer: string;
  isLoading: boolean;
}

export const LegalAdviceModal: React.FC<LegalAdviceModalProps> = ({
  isOpen,
  onClose,
  question,
  answer,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm no-print">
      <div className="bg-white border border-black/10 rounded-xl w-full max-w-xl p-6 shadow-2xl relative text-[#1C1C1C]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8B735B]" />
            <h2 className="text-base font-bold text-[#1C1C1C] font-urdu">
              قانونی و انتظامی مشورہ (Legal Advisory)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-stone-100 text-stone-500 hover:text-[#1C1C1C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#FAF9F6] border border-black/10 text-xs text-[#1C1C1C] font-urdu flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-[#8B735B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#8B735B]">سوال: </span>
            <span>{question}</span>
          </div>
        </div>

        {/* Answer Content */}
        <div className="my-4 p-4 rounded-xl bg-white border border-black/10 min-h-[140px] text-xs sm:text-sm text-[#1C1C1C] font-urdu leading-relaxed whitespace-pre-wrap max-h-[50vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 text-stone-400">
              <div className="w-6 h-6 border-2 border-[#8B735B] border-t-transparent rounded-full animate-spin mb-2" />
              <span>قانونی مشورہ تیار کیا جا رہا ہے...</span>
            </div>
          ) : (
            answer
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#1C1C1C] hover:bg-stone-800 text-white font-semibold text-xs font-urdu shadow-sm"
          >
            بند کریں (Close)
          </button>
        </div>

      </div>
    </div>
  );
};

