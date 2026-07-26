import React from "react";
import { Department, DEPARTMENTS } from "../data/departments";
import { translations } from "../translations";
import { useLanguage } from "../contexts/LanguageContext";
import {
  ShieldAlert,
  Zap,
  Building2,
  FileCheck2,
  GraduationCap,
  Landmark,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
interface DepartmentSelectorProps {
  selectedDepartmentId: string;
  onSelectDepartment: (dept: Department) => void;
  onSelectSamplePrompt: (sampleText: string, sampleTitle: string) => void;
}
const getIcon = (name: string, isSelected: boolean) => {
  const iconClass = `w-6 h-6 ${isSelected ? "text-white" : "text-emerald-600"}`;
  switch (name) {
    case "ShieldAlert":
      return <ShieldAlert className={iconClass} />;
    case "Zap":
      return <Zap className={iconClass} />;
    case "Building2":
      return <Building2 className={iconClass} />;
    case "FileCheck2":
      return <FileCheck2 className={iconClass} />;
    case "GraduationCap":
      return <GraduationCap className={iconClass} />;
    case "Landmark":
      return <Landmark className={iconClass} />;
    default:
      return <Landmark className={iconClass} />;
  }
};
export const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({
  selectedDepartmentId,
  onSelectDepartment,
  onSelectSamplePrompt,
}) => {
  const { t, getTextClass, uiLanguage } = useLanguage();
  const translatedDepts = (translations as any)[uiLanguage].departments || [];
  const selectedTranslatedDept =
    translatedDepts.find((d: any) => d.id === selectedDepartmentId) ||
    translatedDepts[0];
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 transition-all duration-300 border border-gray-100">
      {" "}
      <div className="mb-6">
        {" "}
        <label
          className={getTextClass(
            "text-sm uppercase tracking-widest font-bold text-emerald-700 block",
          )}
        >
          {" "}
          {t("lbl_department")}{" "}
        </label>{" "}
        <p className={getTextClass("text-base text-gray-500 mt-1")}>
          {" "}
          {t("lbl_department_desc")}
          application{" "}
        </p>{" "}
      </div>{" "}
      {/* Grid of Department Cards */}{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {" "}
        {translatedDepts.map((tDept: any) => {
          const dept =
            DEPARTMENTS.find((d) => d.id === tDept.id) || DEPARTMENTS[0];
          const isSelected = dept.id === selectedDepartmentId;
          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => onSelectDepartment(dept)}
              className={`relative h-full flex flex-col justify-center p-6 rounded-xl text-start transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 group ${isSelected ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-transparent shadow-md" : "bg-white border border-gray-200 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300"}`}
            >
              {" "}
              {isSelected && (
                <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-emerald-100" />
              )}{" "}
              <div
                className={`p-3 rounded-xl mb-4 transition-transform group-hover:scale-110 w-max ${isSelected ? "bg-white/20" : "bg-emerald-50 border border-emerald-100"}`}
              >
                {" "}
                {getIcon(dept.iconName, isSelected)}{" "}
              </div>{" "}
              <h2
                className={`text-xl font-bold font-urdu leading-tight w-full mb-2 ${isSelected ? "text-white" : "text-emerald-900"}`}
              >
                {" "}
                {tDept.name}{" "}
              </h2>{" "}
              {isSelected && (
                <div className="mt-auto pt-4 border-t border-emerald-400/50 flex flex-col w-full">
                  {" "}
                  <span className="text-xs uppercase tracking-wider font-semibold text-emerald-100 mb-1">
                    {" "}
                    {tDept.officerLabel}{" "}
                  </span>{" "}
                  <span className="font-urdu text-base text-white font-bold">
                    {" "}
                    {tDept.officerTitle}{" "}
                  </span>{" "}
                </div>
              )}{" "}
            </button>
          );
        })}{" "}
      </div>{" "}
      {/* Preset Complaint Quick Samples for the selected department */}{" "}
      {selectedTranslatedDept &&
        selectedTranslatedDept.samples &&
        selectedTranslatedDept.samples.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            {" "}
            <div className="flex items-center gap-2 mb-4">
              {" "}
              <Sparkles className="w-5 h-5 text-emerald-600" />{" "}
              <span className="text-sm uppercase tracking-wider font-bold text-emerald-700 font-sans">
                {" "}
                {selectedTranslatedDept.samplesTitle}{" "}
              </span>{" "}
            </div>{" "}
            <div className="flex flex-wrap gap-3">
              {" "}
              {selectedTranslatedDept.samples.map(
                (sample: any, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      onSelectSamplePrompt(sample.description, sample.title)
                    }
                    className="px-4 py-2 rounded-lg bg-white hover:bg-emerald-600 hover:text-white border border-gray-200 text-base text-gray-700 font-urdu transition-all shadow-sm hover:shadow-md"
                  >
                    {" "}
                    ✦ {sample.title}{" "}
                  </button>
                ),
              )}{" "}
            </div>{" "}
          </div>
        )}{" "}
    </div>
  );
};
