import React from "react";
import { History, BookOpen, Scale } from "lucide-react";

interface HeaderProps {
  onOpenHistory: () => void;
  historyCount: number;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHistory, historyCount, onOpenGuide }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/10 no-print shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#8B735B]/10 border border-[#8B735B]/30 flex items-center justify-center">
            <Scale className="w-5 h-5 text-[#8B735B]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight italic text-[#8B735B]">
                Arzi-Navees
              </span>
              <span className="text-base font-bold font-nastaliq text-[#1C1C1C]">
                (عریضہ نویس)
              </span>
              <div className="h-4 w-px bg-black/10 hidden sm:block"></div>
              <span className="hidden md:inline-block text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B735B] opacity-80">
                Administrative Drafting Suite v4.2
              </span>
            </div>
            <p className="text-[11px] text-[#1C1C1C]/60 hidden sm:block font-urdu">
              پاکستان کا باضابطہ درخواستی و انتظامی سروس سسٹم
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] uppercase tracking-wider font-semibold text-[#1C1C1C]/80 border border-black/10 hover:border-[#8B735B] hover:text-[#8B735B] hover:bg-[#FAF9F6] transition-colors"
            title="پاکستان میں درخواست جمع کرانے کا طریقہ کار"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8B735B]" />
            <span className="font-urdu">قوانین و رہنمائی</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[11px] uppercase tracking-wider font-semibold bg-[#8B735B] hover:bg-[#735F4B] text-white transition-colors shadow-sm"
          >
            <History className="w-3.5 h-3.5 text-amber-100" />
            <span className="font-urdu">محفوظ درخواستیں</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-white text-[#8B735B] font-bold">
                {historyCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};

