import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, TranslationKey } from "../translations";
interface LanguageContextType {
  uiLanguage: Language;
  setUiLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: "rtl" | "ltr";
  getTextClass: (baseClasses: string) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [uiLanguage, setUiLanguage] = useState<Language>("en");
  useEffect(() => {
    document.documentElement.dir = uiLanguage === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = uiLanguage === "ur" ? "ur" : "en";
  }, [uiLanguage]);
  const t = (key: TranslationKey): string => {
    return (translations[uiLanguage][key] ||
      translations["en"][key] ||
      key) as any;
  };
  const dir = uiLanguage === "ur" ? "rtl" : "ltr";
  const getTextClass = (baseClasses: string) => {
    return `${baseClasses} ${uiLanguage === "ur" ? "urdu-text" : "font-sans"}`;
  };
  return (
    <LanguageContext.Provider
      value={{ uiLanguage, setUiLanguage, t, dir, getTextClass }}
    >
      {" "}
      {children}{" "}
    </LanguageContext.Provider>
  );
};
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
