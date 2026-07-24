import React from "react";
import { DEPARTMENTS, Department } from "../data/departments";
import { 
  ShieldAlert, 
  Zap, 
  Building2, 
  FileCheck2, 
  GraduationCap, 
  Landmark,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface DepartmentSelectorProps {
  selectedDepartmentId: string;
  onSelectDepartment: (dept: Department) => void;
  onSelectSamplePrompt: (sampleText: string, sampleTitle: string) => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case "ShieldAlert": return <ShieldAlert className="w-5 h-5" />;
    case "Zap": return <Zap className="w-5 h-5" />;
    case "Building2": return <Building2 className="w-5 h-5" />;
    case "FileCheck2": return <FileCheck2 className="w-5 h-5" />;
    case "GraduationCap": return <GraduationCap className="w-5 h-5" />;
    case "Landmark": return <Landmark className="w-5 h-5" />;
    default: return <Landmark className="w-5 h-5" />;
  }
};

export const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({
  selectedDepartmentId,
  onSelectDepartment,
  onSelectSamplePrompt,
}) => {
  const selectedDept = DEPARTMENTS.find((d) => d.id === selectedDepartmentId) || DEPARTMENTS[0];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-sm sm:text-base font-semibold text-slate-200 font-urdu">
            ۱. متعلقہ محکمہ یا دفتر کا انتخاب کریں (Select Department)
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-urdu">
          افسرِ مجاز: <strong className="text-emerald-400">{selectedDept.officerTitleUrdu}</strong>
        </span>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {DEPARTMENTS.map((dept) => {
          const isSelected = dept.id === selectedDepartmentId;
          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => onSelectDepartment(dept)}
              className={`relative flex flex-col items-start p-3 rounded-xl border text-right transition-all duration-200 group ${
                isSelected
                  ? "bg-emerald-950/70 border-emerald-500/80 shadow-md shadow-emerald-950/40 text-emerald-100"
                  : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950"
              }`}
            >
              {isSelected && (
                <CheckCircle2 className="absolute top-2 left-2 w-4 h-4 text-emerald-400" />
              )}
              <div className={`p-2 rounded-lg mb-2 transition-transform group-hover:scale-105 ${
                isSelected ? "bg-emerald-800/50 text-emerald-200" : "bg-slate-900 text-slate-400"
              }`}>
                {getIcon(dept.iconName)}
              </div>
              <span className="text-xs font-semibold font-urdu leading-tight text-right w-full">
                {dept.nameUrdu}
              </span>
              <span className="text-[10px] text-slate-400 font-sans mt-1 truncate w-full text-left">
                {dept.nameEnglish}
              </span>
            </button>
          );
        })}
      </div>

      {/* Preset Complaint Quick Samples for the selected department */}
      {selectedDept.samples && selectedDept.samples.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center space-x-1.5 space-x-reverse mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-medium text-slate-300 font-urdu">
              عام مثالیں (فوری انتخاب کریں):
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedDept.samples.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSamplePrompt(sample.descriptionUrdu, sample.titleUrdu)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-700/60 text-xs text-slate-300 hover:text-emerald-200 transition-colors font-urdu text-right"
              >
                ✦ {sample.titleUrdu}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
