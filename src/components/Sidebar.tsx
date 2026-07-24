import React from "react";
import { PenTool, History, FileText, Settings } from "lucide-react";

interface SidebarProps {
  onOpenHistory: () => void;
  historyCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenHistory, historyCount }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm fixed inset-y-0 left-0 z-10 pt-16 no-print">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-800 font-semibold transition-all duration-300 hover:shadow-md">
          <PenTool className="w-5 h-5 text-emerald-600" />
          <span>New Application</span>
        </a>
        <button onClick={onOpenHistory} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 hover:shadow-sm">
          <div className="flex items-center gap-3">
            <History className="w-5 h-5" />
            <span>History</span>
          </div>
          {historyCount > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {historyCount}
            </span>
          )}
        </button>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 hover:shadow-sm">
          <FileText className="w-5 h-5" />
          <span>Templates</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 hover:shadow-sm">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </a>
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-center text-gray-500 font-medium">
          Arzi-Navees v5.0<br />
          Official Suite
        </div>
      </div>
    </aside>
  );
};
