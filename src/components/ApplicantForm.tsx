import React, { useState } from "react";
import { ApplicantDetails } from "../types";
import {
  User,
  Phone,
  CreditCard,
  MapPin,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Save,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
interface ApplicantFormProps {
  applicant: ApplicantDetails;
  onChange: (updated: ApplicantDetails) => void;
  outputLanguage: "Urdu" | "English";
}
export const ApplicantForm: React.FC<ApplicantFormProps> = ({
  applicant,
  onChange,
  outputLanguage,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const { t, getTextClass } = useLanguage();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...applicant, [name]: value });
  };
  const autofillPlaceholders = () => {
    if (outputLanguage === "Urdu") {
      onChange({
        name: "محمد احمد قریشی",
        fatherName: "عبدالرشید قریشی",
        cnic: "35202-1245890-1",
        phone: "0300-4589012",
        address: "مکان نمبر ۴۵، بلاک بی، ماڈل ٹاؤن",
        city: "لاہور",
        date: new Date().toISOString().split("T")[0],
      });
    } else {
      onChange({
        name: "Muhammad Ahmed Qureshi",
        fatherName: "Abdul Rasheed Qureshi",
        cnic: "35202-1245890-1",
        phone: "0300-4589012",
        address: "House No 45, Block B, Model Town",
        city: "Lahore",
        date: new Date().toISOString().split("T")[0],
      });
    }
  };
  const clearApplicantInfo = () => {
    onChange({
      name: "",
      fatherName: "",
      cnic: "",
      phone: "",
      address: "",
      city: "",
      date: new Date().toISOString().split("T")[0],
    });
  };
  const hasStoredData = Boolean(
    applicant.name || applicant.cnic || applicant.phone,
  );
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      {" "}
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {" "}
        <div>
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <label
              className={getTextClass(
                "text-[10px] uppercase tracking-widest font-bold text-emerald-700 block",
              )}
            >
              {" "}
              {t("lbl_applicant")}{" "}
            </label>{" "}
            {hasStoredData && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100 ">
                {" "}
                <Save className="w-2.5 h-2.5" />{" "}
                <span className={getTextClass("")}>Auto-Saved</span>{" "}
              </span>
            )}{" "}
          </div>{" "}
          <p className={getTextClass("text-xs text-gray-500 mt-0.5")}>
            {" "}
            Your details are saved locally for future use{" "}
          </p>{" "}
        </div>{" "}
        <div className="flex items-center gap-2">
          {" "}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              autofillPlaceholders();
            }}
            className={getTextClass(
              "text-[11px] px-3 py-1 rounded bg-gray-50 hover:bg-emerald-600 :bg-emerald-600 hover:text-white text-gray-700 border border-gray-200 transition-colors shadow-sm",
            )}
          >
            {" "}
            Auto-fill{" "}
          </button>{" "}
          {hasStoredData && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearApplicantInfo();
              }}
              className="p-1 rounded text-gray-400 hover:text-red-600 :text-red-500 transition-colors"
              title="تمام کوائف صاف کریں"
            >
              {" "}
              <Trash2 className="w-4 h-4" />{" "}
            </button>
          )}{" "}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}{" "}
        </div>{" "}
      </div>{" "}
      {isExpanded && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {" "}
          {/* Name */}{" "}
          <div className="space-y-1">
            {" "}
            <label
              className={getTextClass(
                "block text-sm font-semibold text-gray-700 ",
              )}
            >
              {" "}
              {t("placeholder_name")}{" "}
            </label>{" "}
            <div className="relative">
              {" "}
              <input
                type="text"
                name="name"
                value={applicant.name}
                onChange={handleInputChange}
                placeholder={
                  outputLanguage === "Urdu"
                    ? "مثلاً: محمد احمد قریشی"
                    : "e.g. Muhammad Ahmed Qureshi"
                }
                className={getTextClass(
                  "w-full bg-transparent border-b border-gray-300 focus:border-emerald-500 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none transition-colors",
                )}
              />{" "}
            </div>{" "}
          </div>{" "}
          {/* Father/Husband Name */}{" "}
          <div className="space-y-1">
            {" "}
            <label
              className={getTextClass(
                "block text-sm font-semibold text-gray-700 ",
              )}
            >
              {" "}
              Father/Husband Name{" "}
            </label>{" "}
            <div className="relative">
              {" "}
              <input
                type="text"
                name="fatherName"
                value={applicant.fatherName}
                onChange={handleInputChange}
                placeholder={
                  outputLanguage === "Urdu"
                    ? "مثلاً: عبدالرشید قریشی"
                    : "e.g. Abdul Rasheed"
                }
                className={getTextClass(
                  "w-full bg-transparent border-b border-gray-300 focus:border-emerald-500 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none transition-colors",
                )}
              />{" "}
            </div>{" "}
          </div>{" "}
          {/* CNIC */}{" "}
          <div className="space-y-1">
            {" "}
            <label
              className={getTextClass(
                "block text-sm font-semibold text-gray-700 ",
              )}
            >
              {" "}
              {t("placeholder_cnic")}{" "}
            </label>{" "}
            <div className="relative">
              {" "}
              <input
                type="text"
                name="cnic"
                value={applicant.cnic}
                onChange={handleInputChange}
                placeholder="35202-1245890-1"
                className={getTextClass(
                  "w-full bg-transparent border-b border-gray-300 focus:border-emerald-500 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none transition-colors",
                )}
                dir="ltr"
              />{" "}
            </div>{" "}
          </div>{" "}
          {/* Phone */}{" "}
          <div className="space-y-1">
            {" "}
            <label
              className={getTextClass(
                "block text-sm font-semibold text-gray-700 ",
              )}
            >
              {" "}
              {t("placeholder_mobile")}{" "}
            </label>{" "}
            <div className="relative">
              {" "}
              <input
                type="text"
                name="phone"
                value={applicant.phone}
                onChange={handleInputChange}
                placeholder="0300-4589012"
                className={getTextClass(
                  "w-full bg-transparent border-b border-gray-300 focus:border-emerald-500 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none transition-colors",
                )}
                dir="ltr"
              />{" "}
            </div>{" "}
          </div>{" "}
          {/* Address */}{" "}
          <div className="space-y-1">
            {" "}
            <label
              className={getTextClass(
                "block text-sm font-semibold text-gray-700 ",
              )}
            >
              {" "}
              {t("placeholder_address")}{" "}
            </label>{" "}
            <div className="relative">
              {" "}
              <input
                type="text"
                name="address"
                value={applicant.address}
                onChange={handleInputChange}
                placeholder={
                  outputLanguage === "Urdu"
                    ? "مکان نمبر ۴۵، بلاک بی، ماڈل ٹاؤن"
                    : "House 45, Block B, Model Town"
                }
                className={getTextClass(
                  "w-full bg-transparent border-b border-gray-300 focus:border-emerald-500 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none transition-colors",
                )}
              />{" "}
            </div>{" "}
          </div>{" "}
          {/* City */}{" "}
          <div className="space-y-1">
            {" "}
            <label
              className={getTextClass(
                "block text-sm font-semibold text-gray-700 ",
              )}
            >
              {" "}
              {t("placeholder_city")}{" "}
            </label>{" "}
            <div className="relative">
              {" "}
              <input
                type="text"
                name="city"
                value={applicant.city}
                onChange={handleInputChange}
                placeholder={
                  outputLanguage === "Urdu"
                    ? "مثلاً: لاہور / کراچی / اسلام آباد"
                    : "e.g. Lahore / Karachi"
                }
                className={getTextClass(
                  "w-full bg-transparent border-b border-gray-300 focus:border-emerald-500 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none transition-colors",
                )}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};
