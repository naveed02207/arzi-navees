const fs = require('fs');

const sidebarCode = `import React from "react";
import { PenTool, History, FileText, Settings, Home } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export type ViewState = "home" | "services" | "templates" | "settings";

interface SidebarProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onOpenHistory,
  historyCount,
}) => {
  const { t, getTextClass } = useLanguage();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 border-r border-emerald-900 shadow-sm fixed inset-y-0 left-0 z-10 pt-16 no-print">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <button
          onClick={() => setActiveView("home")}
          className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md \${
            activeView === "home"
              ? "bg-white/20 text-white shadow-md"
              : "text-white hover:bg-white/10"
          }\`}
        >
          <Home className="w-5 h-5 text-white" />
          <span className={getTextClass("")}>{t("nav_home")}</span>
        </button>

        <button
          onClick={() => setActiveView("services")}
          className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md \${
            activeView === "services"
              ? "bg-white/20 text-white shadow-md"
              : "text-white hover:bg-white/10"
          }\`}
        >
          <PenTool className="w-5 h-5 text-white" />
          <span className={getTextClass("")}>{t("nav_services")}</span>
        </button>

        <button
          onClick={onOpenHistory}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-white" />
            <span className={getTextClass("")}>History</span>
          </div>
          {historyCount > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-white text-emerald-800 font-bold">
              {historyCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveView("templates")}
          className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md \${
            activeView === "templates"
              ? "bg-white/20 text-white shadow-md"
              : "text-white hover:bg-white/10"
          }\`}
        >
          <FileText className="w-5 h-5 text-white" />
          <span className={getTextClass("")}>{t("nav_templates")}</span>
        </button>

        <button
          onClick={() => setActiveView("settings")}
          className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md \${
            activeView === "settings"
              ? "bg-white/20 text-white shadow-md"
              : "text-white hover:bg-white/10"
          }\`}
        >
          <Settings className="w-5 h-5 text-white" />
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
  );
};
\`;

fs.writeFileSync('src/components/Sidebar.tsx', sidebarCode);

const headerCode = \`import React from "react";
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
    <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 border-b border-emerald-900 no-print shadow-sm h-16">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
                Arzi-Navees
              </span>
              <span className="text-base font-bold font-urdu text-white/90 hidden sm:block">
                (عریضہ نویس)
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/10 rounded-lg p-1 border border-white/20">
            <Globe className="w-4 h-4 text-white mx-2" />
            <select
              value={uiLanguage}
              onChange={(e) => setUiLanguage(e.target.value as Language)}
              className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer px-1 [&>option]:text-gray-900"
            >
              <option value="en">English</option>
              <option value="ur">اردو</option>
              <option value="roman">Roman</option>
            </select>
          </div>

          <button
            onClick={onOpenGuide}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            title="پاکستان میں درخواست جمع کرانے کا طریقہ کار"
          >
            <BookOpen className="w-4 h-4" />
            <span className={getTextClass("")}>قوانین و رہنمائی</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="md:hidden relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            <History className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-white text-emerald-800 font-bold">
                {historyCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-white/20 hidden sm:block"></div>

          <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
            <UserCircle className="w-8 h-8" />
          </button>
        </div>
      </div>
    </header>
  );
};
\`;
fs.writeFileSync('src/components/Header.tsx', headerCode);

console.log("Rewrote headers");
