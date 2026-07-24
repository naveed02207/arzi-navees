import React from "react";
import { PenTool, History, FileText, Settings, Home } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export type ViewState = "home" | "services" | "templates" | "settings";

interface SidebarProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onOpenHistory, historyCount }) => {
  const { t, getTextClass } = useLanguage();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm fixed inset-y-0 left-0 z-10 pt-16 no-print">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <button 
          onClick={() => setActiveView('home')} 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md ${activeView === 'home' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-gray-800 dark:hover:text-emerald-400'}`}
        >
          <Home className={`w-5 h-5 ${activeView === 'home' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
          <span className={getTextClass("")}>{t("nav_home")}</span>
        </button>
        <button 
          onClick={() => setActiveView('services')} 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md ${activeView === 'services' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-gray-800 dark:hover:text-emerald-400'}`}
        >
          <PenTool className={`w-5 h-5 ${activeView === 'services' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
          <span className={getTextClass("")}>{t("nav_services")}</span>
        </button>
        <button onClick={onOpenHistory} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 font-medium hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-gray-800 dark:hover:text-emerald-400 transition-all duration-300 hover:shadow-sm">
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className={getTextClass("")}>History</span>
          </div>
          {historyCount > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-bold">
              {historyCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveView('templates')} 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md ${activeView === 'templates' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-gray-800 dark:hover:text-emerald-400'}`}
        >
          <FileText className={`w-5 h-5 ${activeView === 'templates' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
          <span className={getTextClass("")}>{t("nav_templates")}</span>
        </button>
        <button 
          onClick={() => setActiveView('settings')} 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md ${activeView === 'settings' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-gray-800 dark:hover:text-emerald-400'}`}
        >
          <Settings className={`w-5 h-5 ${activeView === 'settings' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
          <span className={getTextClass("")}>{t("nav_settings")}</span>
        </button>
      </div>
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-xs text-center text-gray-500 font-medium">
          Arzi-Navees v5.0<br />
          Official Suite
        </div>
      </div>
    </aside>
  );
};

