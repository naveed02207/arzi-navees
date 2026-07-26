import React from "react";
import { Department, DEPARTMENTS } from "../data/departments";
import {
  Zap,
  ShieldAlert,
  Trash2,
  GraduationCap,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { ViewState } from "./Sidebar";
import { TranslationKey } from "../translations";

interface TemplatesViewProps {
  setActiveView: (view: ViewState) => void;
  onSelectTemplate: (department: Department, sampleRoman: string) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  setActiveView,
  onSelectTemplate,
}) => {
  const { t, getTextClass } = useLanguage();

  const templates = [
    {
      id: "wapda",
      titleKey: "tpl_wapda_title" as TranslationKey,
      descKey: "tpl_wapda_desc" as TranslationKey,
      icon: Zap,
      deptId: "wapda",
      sample:
        "Is mahine bill 40,000 aya hai jabke meter reading sirf 200 unit hai, bill sahi kia jaye.",
    },
    {
      id: "police",
      titleKey: "tpl_police_title" as TranslationKey,
      descKey: "tpl_police_desc" as TranslationKey,
      icon: ShieldAlert,
      deptId: "police",
      sample:
        "Mera mobile / motorcycle market se choori ho gaya hai, police report karwani hai raseed ke liye.",
    },
    {
      id: "municipal",
      titleKey: "tpl_municipal_title" as TranslationKey,
      descKey: "tpl_municipal_desc" as TranslationKey,
      icon: Trash2,
      deptId: "municipal",
      sample:
        "Gali mein gatar ubal raha hai aur kachra para hai, pichle ek mahine se koi safai wala nahi aya.",
    },
    {
      id: "education",
      titleKey: "tpl_education_title" as TranslationKey,
      descKey: "tpl_education_desc" as TranslationKey,
      icon: GraduationCap,
      deptId: "education",
      sample:
        "Main ne BS complete kar lia hai, meri degree aur clearance certificate jaldi issue ki jaye.",
    },
    {
      id: "nadra",
      titleKey: "tpl_nadra_title" as TranslationKey,
      descKey: "tpl_nadra_desc" as TranslationKey,
      icon: CreditCard,
      deptId: "nadra",
      sample:
        "Mera CNIC par naam ki spelling ghalat print ho gai hai, isko theek kia jaye.",
    },
  ];

  const handleUseTemplate = (template: any) => {
    const dept = DEPARTMENTS.find((d) => d.id === template.deptId);
    if (dept) {
      onSelectTemplate(dept, template.sample);
      setActiveView("services");
    }
  };

  return (
    <div className="bg-transparent space-y-6">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 relative overflow-hidden transition-all duration-300">
        <h2
          className={getTextClass(
            "text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-2",
          )}
        >
          {t("tpl_header")}
        </h2>
        <p
          className={getTextClass(
            "text-gray-500 mb-8 max-w-2xl text-base leading-relaxed",
          )}
        >
          {t("tpl_header_desc")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-gray-200 shadow-sm rounded-xl h-full flex flex-col items-center justify-center gap-2 p-6 text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 group"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mb-2">
                <tpl.icon className="w-6 h-6" />
              </div>
              <h3
                className={getTextClass(
                  "font-bold text-gray-900 text-xl group-hover:text-emerald-700 transition-colors",
                )}
              >
                {t(tpl.titleKey)}
              </h3>
              <p className={getTextClass("text-base text-gray-600")}>
                {t(tpl.descKey)}
              </p>
              <button
                onClick={() => handleUseTemplate(tpl)}
                className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-base hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <span className={getTextClass("")}>{t("tpl_use")}</span>
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
