import React from "react";
import { History, BookOpen, Scale, UserCircle, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../translations";

interface HeaderProps {
  onOpenHistory: () => void;
  historyCount: number;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHistory, historyCount, onOpenGuide }) => {
  const { uiLanguage, setUiLanguage, t, getTextClass } = useLanguage();

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 no-print shadow-sm h-16">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-gray-900 dark:text-white">
                Arzi-Navees
              </span>
              <span className="text-base font-bold font-urdu text-emerald-700 dark:text-emerald-400 hidden sm:block">
                (عریضہ نویس)
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          
          <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-2" />
            <select 
              value={uiLanguage}
              onChange={(e) => setUiLanguage(e.target.value as Language)}
              className="bg-transparent text-sm font-semibold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer px-1"
            >
              <option value="en">English</option>
              <option value="ur">اردو</option>
              <option value="roman">Roman</option>
            </select>
          </div>

          <button
            onClick={onOpenGuide}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/50 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            title="پاکستان میں درخواست جمع کرانے کا طریقہ کار"
          >
            <BookOpen className="w-4 h-4" />
            <span className={getTextClass("")}>قوانین و رہنمائی</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="md:hidden relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            <History className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-emerald-600 text-white font-bold">
                {historyCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
          
          <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            <UserCircle className="w-8 h-8" />
          </button>

        </div>

      </div>
    </header>
  );
};

