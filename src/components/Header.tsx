import React from "react";
import { History, BookOpen, Scale, UserCircle, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../translations";

interface HeaderProps {
  onOpenHistory: () => void;
  historyCount: number;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  historyCount,
  onOpenGuide,
}) => {
  const { uiLanguage, setUiLanguage, t, getTextClass } = useLanguage();

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 border-b border-emerald-900 print:hidden shadow-sm h-16">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
                Arzi-Navees
              </span>
              <span className="text-base font-bold font-urdu text-white hidden sm:block">
                (عریضہ نویس)
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-white mr-2" />
            <select
              value={uiLanguage}
              onChange={(e) => setUiLanguage(e.target.value as Language)}
              className="bg-white text-slate-800 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer rounded-lg px-2 py-1.5 text-sm font-semibold"
            >
              <option value="en">English</option>
              <option value="ur">اردو</option>
              <option value="roman">Roman</option>
            </select>
          </div>

          <button
            onClick={onOpenGuide}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-emerald-100 hover:text-emerald-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
            title="پاکستان میں درخواست جمع کرانے کا طریقہ کار"
          >
            <BookOpen className="w-4 h-4" />
            <span className={getTextClass("")}>قوانین و رہنمائی</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="md:hidden relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white hover:text-emerald-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ms-1 px-2 py-0.5 text-xs rounded-full bg-teal-500 text-white font-bold">
                {historyCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-gray-200 hidden sm:block opacity-30"></div>

          <button className="flex items-center gap-2 text-white hover:text-emerald-200 transition-colors">
            <UserCircle className="w-8 h-8" />
          </button>
        </div>
      </div>
    </header>
  );
};
