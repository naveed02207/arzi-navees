import React from "react";
import { DraftResponse } from "../types";
import {
  X,
  Trash2,
  ExternalLink,
  Calendar,
  Building2,
  FileText,
  Bookmark,
} from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm no-print">
      {" "}
      <div className="w-full max-w-md bg-white border-l border-black/10 h-full flex flex-col p-6 shadow-2xl animate-in slide-in-from-right duration-200 text-[#1C1C1C]">
        {" "}
        {/* Header */}{" "}
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <Bookmark className="w-5 h-5 text-[#8B735B]" />{" "}
            <h2 className="text-base font-bold font-urdu text-[#1C1C1C]">
              {" "}
              محفوظ شدہ درخواستیں ({savedDrafts.length}){" "}
            </h2>{" "}
          </div>{" "}
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-stone-100 text-stone-500 hover:text-[#1C1C1C]"
          >
            {" "}
            <X className="w-5 h-5" />{" "}
          </button>{" "}
        </div>{" "}
        {/* List */}{" "}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {" "}
          {savedDrafts.length === 0 ? (
            <div className="text-center py-12 text-stone-400 font-urdu">
              {" "}
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#8B735B]" />{" "}
              <p className="text-sm">
                ابھی تک کوئی درخواست محفوظ نہیں کی گئی۔
              </p>{" "}
            </div>
          ) : (
            savedDrafts.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAF9F6] p-4 rounded-xl border border-black/10 hover:border-[#8B735B] transition-colors group"
              >
                {" "}
                <div className="flex items-start justify-between">
                  {" "}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B735B] font-urdu">
                    {" "}
                    <Building2 className="w-3.5 h-3.5 text-[#8B735B]" />{" "}
                    <span>{item.request.departmentName}</span>{" "}
                  </div>{" "}
                  <span className="text-[10px] text-stone-400 flex items-center gap-1">
                    {" "}
                    <Calendar className="w-3 h-3 ml-1" />{" "}
                    <span>{item.timestamp.slice(0, 10)}</span>{" "}
                  </span>{" "}
                </div>{" "}
                <p className="text-xs text-[#1C1C1C] font-urdu line-clamp-2 my-2.5 leading-relaxed">
                  {" "}
                  {item.applicationText.slice(0, 120)}...{" "}
                </p>{" "}
                <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs">
                  {" "}
                  <button
                    onClick={() => {
                      onSelectDraft(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-[#8B735B] hover:text-[#735F4B] font-urdu text-[11px] font-semibold"
                  >
                    {" "}
                    <span>دوبارہ کھولیں</span>{" "}
                    <ExternalLink className="w-3 h-3" />{" "}
                  </button>{" "}
                  <button
                    onClick={() => onDeleteDraft(item.id)}
                    className="text-rose-600 hover:text-rose-800 p-1 transition-colors"
                    title="حذف کریں"
                  >
                    {" "}
                    <Trash2 className="w-3.5 h-3.5" />{" "}
                  </button>{" "}
                </div>{" "}
              </div>
            ))
          )}{" "}
        </div>{" "}
        {/* Footer */}{" "}
        {savedDrafts.length > 0 && (
          <div className="pt-3 border-t border-black/10 flex justify-end">
            {" "}
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-800 font-urdu flex items-center gap-1 font-semibold"
            >
              {" "}
              <Trash2 className="w-3.5 h-3.5" />{" "}
              <span>تمام ریکارڈ صاف کریں</span>{" "}
            </button>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};
