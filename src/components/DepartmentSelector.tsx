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
    case "ShieldAlert": return <ShieldAlert className="w-4 h-4" />;
    case "Zap": return <Zap className="w-4 h-4" />;
    case "Building2": return <Building2 className="w-4 h-4" />;
    case "FileCheck2": return <FileCheck2 className="w-4 h-4" />;
    case "GraduationCap": return <GraduationCap className="w-4 h-4" />;
    case "Landmark": return <Landmark className="w-4 h-4" />;
    default: return <Landmark className="w-4 h-4" />;
  }
};

export const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({
  selectedDepartmentId,
  onSelectDepartment,
  onSelectSamplePrompt,
}) => {
  const selectedDept = DEPARTMENTS.find((d) => d.id === selectedDepartmentId) || DEPARTMENTS[0];

  return (
    <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-700 block">
            01. Target Department (محکمہ / شعبہ)
          </label>
          <p className="text-xs text-gray-500 font-urdu mt-0.5">
            جس ڈائریکٹوریٹ یا محکمے کو درخواست ارسال کرنی ہو اس کا انتخاب کریں
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700">افسرِ مجاز:</span>
          <strong className="font-urdu text-emerald-900">{selectedDept.officerTitleUrdu}</strong>
        </div>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {DEPARTMENTS.map((dept) => {
          const isSelected = dept.id === selectedDepartmentId;
          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => onSelectDepartment(dept)}
              className={`relative flex flex-col items-start p-3.5 rounded-lg border text-right transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md group ${
                isSelected
                  ? "bg-emerald-700 border-emerald-700 text-white shadow-md"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:border-emerald-500 hover:bg-white"
              }`}
            >
              {isSelected && (
                <CheckCircle2 className="absolute top-2.5 left-2.5 w-4 h-4 text-emerald-100" />
              )}
              <div className={`p-2 rounded-md mb-2 transition-transform group-hover:scale-110 ${
                isSelected ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 border border-gray-200 shadow-sm"
              }`}>
                {getIcon(dept.iconName)}
              </div>
              <span className="text-xs font-semibold font-urdu leading-tight text-right w-full">
                {dept.nameUrdu}
              </span>
              <span className={`text-[10px] font-sans mt-1 truncate w-full text-left ${isSelected ? "text-emerald-100" : "text-gray-500"}`}>
                {dept.nameEnglish}
              </span>
            </button>
          );
        })}
      </div>

      {/* Preset Complaint Quick Samples for the selected department */}
      {selectedDept.samples && selectedDept.samples.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 font-sans">
              فوری شکایت کے نمونے (Preset Samples):
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedDept.samples.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSamplePrompt(sample.descriptionUrdu, sample.titleUrdu)}
                className="px-3.5 py-1.5 rounded-md bg-gray-50 hover:bg-emerald-600 hover:text-white border border-gray-200 text-xs text-gray-700 font-urdu text-right transition-colors hover:shadow-sm"
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

