import React from "react";
import { DraftResponse } from "../types";
import { X, Trash2, ExternalLink, Calendar, Building2, FileText, Bookmark } from "lucide-react";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedDrafts: DraftResponse[];
  onSelectDraft: (draft: DraftResponse) => void;
  onDeleteDraft: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedDrafts,
  onSelectDraft,
  onDeleteDraft,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm no-print">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col p-5 shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Bookmark className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-slate-100 font-urdu">
              محفوظ شدہ درخواستیں ({savedDrafts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedDrafts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-urdu">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-30 text-slate-400" />
              <p className="text-sm">ابھی تک کوئی درخواست محفوظ نہیں کی گئی۔</p>
            </div>
          ) : (
            savedDrafts.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 hover:border-emerald-700/60 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-xs font-semibold text-emerald-400 font-urdu">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.request.departmentName}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 flex items-center space-x-1">
                    <Calendar className="w-3 h-3 ml-1" />
                    <span>{item.timestamp.slice(0, 10)}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-urdu line-clamp-2 my-2 leading-relaxed">
                  {item.applicationText.slice(0, 120)}...
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                  <button
                    onClick={() => {
                      onSelectDraft(item);
                      onClose();
                    }}
                    className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-urdu text-[11px]"
                  >
                    <span>دوبارہ کھولیں</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onDeleteDraft(item.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="حذف کریں"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedDrafts.length > 0 && (
          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClearAll}
              className="text-xs text-red-400 hover:text-red-300 font-urdu flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>تمام ریکارڈ صاف کریں</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
