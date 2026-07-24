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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-slate-100 font-urdu">
              قانونی و انتظامی مشورہ (Legal Advice)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-urdu flex items-start space-x-2 space-x-reverse">
          <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-emerald-400">سوال: </span>
            <span>{question}</span>
          </div>
        </div>

        {/* Answer Content */}
        <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 min-h-[140px] text-xs sm:text-sm text-slate-200 font-urdu leading-relaxed whitespace-pre-wrap max-h-[50vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 text-slate-400">
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2" />
              <span>مشورہ تیار کیا جا رہا ہے...</span>
            </div>
          ) : (
            answer
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs font-urdu"
          >
            بند کریں (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
