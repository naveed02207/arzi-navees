import React from "react";
import { History, BookOpen, Scale, UserCircle, Globe, Menu, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../translations";

interface HeaderProps {
  onOpenHistory: () => void;
  historyCount: number;
  onOpenGuide: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  historyCount,
  onOpenGuide,
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const { uiLanguage, setUiLanguage, getTextClass } = useLanguage();

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 border-b border-emerald-900 print:hidden shadow-sm h-16">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors -ms-2"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
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
            <Globe className="w-5 h-5 text-white mr-2 hidden sm:block" />
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
            className="lg:hidden relative flex items-center justify-center p-2 rounded-lg text-white bg-white/10 border border-white/20 hover:bg-white hover:text-emerald-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <History className="w-5 h-5" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white shadow">
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
