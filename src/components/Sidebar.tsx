import React from "react";
import { PenTool, History, FileText, Settings, Home } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export type ViewState = "home" | "services" | "templates" | "settings";

interface SidebarProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
  onOpenHistory: () => void;
  historyCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onOpenHistory,
  historyCount,
  isOpen,
  onClose,
}) => {
  const { t, getTextClass, dir } = useLanguage();
  
  const hiddenTranslateClass = dir === 'rtl' ? 'translate-x-full' : '-translate-x-full';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      <aside 
        className={`fixed inset-y-0 start-0 z-30 pt-16 w-64 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 border-e border-emerald-900 shadow-sm flex flex-col transform transition-transform duration-300 print:hidden ${
          isOpen ? "translate-x-0" : `${hiddenTranslateClass} lg:translate-x-0`
        }`}
      >
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <button
            onClick={() => { setActiveView("home"); onClose(); }}
            className={`flex items-center gap-3 w-full text-start px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md ${
              activeView === "home"
                ? "bg-white/20 text-white shadow-md"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Home className="w-5 h-5 text-white shrink-0" />
            <span className={getTextClass("")}>{t("nav_home")}</span>
          </button>
          <button
            onClick={() => { setActiveView("services"); onClose(); }}
            className={`flex items-center gap-3 w-full text-start px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md ${
              activeView === "services"
                ? "bg-white/20 text-white shadow-md"
                : "text-white hover:bg-white/10"
            }`}
          >
            <PenTool className="w-5 h-5 text-white shrink-0" />
            <span className={getTextClass("")}>{t("nav_services")}</span>
          </button>
          <button
            onClick={() => { onOpenHistory(); onClose(); }}
            className="flex items-center gap-3 w-full text-start px-4 py-3 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 hover:shadow-sm relative"
          >
            <History className="w-5 h-5 text-white shrink-0" />
            <span className={`flex-1 ${getTextClass("")}`}>{t("nav_history")}</span>
            {historyCount > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-white text-emerald-800 font-bold shrink-0">
                {historyCount}
              </span>
            )}
          </button>
          <button
            onClick={() => { setActiveView("templates"); onClose(); }}
            className={`flex items-center gap-3 w-full text-start px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md ${
              activeView === "templates"
                ? "bg-white/20 text-white shadow-md"
                : "text-white hover:bg-white/10"
            }`}
          >
            <FileText className="w-5 h-5 text-white shrink-0" />
            <span className={getTextClass("")}>{t("nav_templates")}</span>
          </button>
          <button
            onClick={() => { setActiveView("settings"); onClose(); }}
            className={`flex items-center gap-3 w-full text-start px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md ${
              activeView === "settings"
                ? "bg-white/20 text-white shadow-md"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Settings className="w-5 h-5 text-white shrink-0" />
            <span className={getTextClass("")}>{t("nav_settings")}</span>
          </button>
        </div>
        <div className="p-4 border-t border-emerald-600/30">
          <div className="text-xs text-center text-white/80 font-medium">
            Arzi-Navees v5.0<br />
            Official Suite
          </div>
        </div>
      </aside>
    </>
  );
};
