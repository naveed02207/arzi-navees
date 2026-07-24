import React from "react";
import { FileText, Shield, History, Sparkles, Scale, BookOpen } from "lucide-react";

interface HeaderProps {
  onOpenHistory: () => void;
  historyCount: number;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHistory, historyCount, onOpenGuide }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-emerald-900/40 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-500/30">
            <Scale className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <h1 className="text-xl sm:text-2xl font-bold font-nastaliq text-emerald-400 tracking-wide">
                عریضہ نویس
              </h1>
              <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                Arzi-Navees
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block font-urdu">
              پاکستان کا مجاز قانونی و انتظامی درخواستی سروس اور کلرک
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          <button
            onClick={onOpenGuide}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
            title="پاکستان میں درخواست جمع کرانے کا طریقہ کار"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline font-urdu">قوانین و رہنمائی</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 transition-colors"
          >
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-urdu">محفوظ درخواستیں</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-emerald-500 text-slate-950 font-bold">
                {historyCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
