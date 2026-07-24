import React, { useState } from "react";
import { ApplicantDetails } from "../types";
import { User, Phone, CreditCard, MapPin, ChevronDown, ChevronUp, UserCheck, Save, RefreshCw, Trash2 } from "lucide-react";

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

  const hasStoredData = Boolean(applicant.name || applicant.cnic || applicant.phone);

  return (
    <div className="bg-white rounded-xl border border-black/10 p-5 sm:p-6 shadow-sm">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <div className="flex items-center gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#8B735B] block">
              02. Applicant Details (سائل / درخواست دہندہ کے کوائف)
            </label>
            {hasStoredData && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#8B735B]/10 text-[#8B735B] font-semibold">
                <Save className="w-2.5 h-2.5" />
                <span>محفوظ شدہ (Auto-Saved)</span>
              </span>
            )}
          </div>
          <p className="text-xs text-[#1C1C1C]/60 font-urdu mt-0.5">
            نام، شناختی کارڈ اور رابطہ نمبر خودکار طور پر مستقبل کے استعمال کے لیے محفوظ ہو جاتا ہے
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              autofillPlaceholders();
            }}
            className="text-[11px] px-3 py-1 rounded bg-[#FAF9F6] hover:bg-[#8B735B] hover:text-white text-[#1C1C1C] font-urdu border border-black/10 transition-colors"
          >
            مثالی کوائف درج کریں
          </button>
          
          {hasStoredData && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearApplicantInfo();
              }}
              className="p-1 rounded text-stone-400 hover:text-rose-600 transition-colors"
              title="تمام کوائف صاف کریں"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-stone-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1C1C1C] font-urdu">
              سائل کا مکمل نام (Applicant Name)
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={applicant.name}
                onChange={handleInputChange}
                placeholder={outputLanguage === "Urdu" ? "مثلاً: محمد احمد قریشی" : "e.g. Muhammad Ahmed Qureshi"}
                className="w-full bg-transparent border-b border-black/20 focus:border-[#8B735B] py-1.5 text-sm text-[#1C1C1C] placeholder:text-stone-400 outline-none font-urdu transition-colors"
              />
            </div>
          </div>

          {/* Father/Husband Name */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1C1C1C] font-urdu">
              ولدیت / زوجیت (Father/Husband Name)
            </label>
            <div className="relative">
              <input
                type="text"
                name="fatherName"
                value={applicant.fatherName}
                onChange={handleInputChange}
                placeholder={outputLanguage === "Urdu" ? "مثلاً: عبدالرشید قریشی" : "e.g. Abdul Rasheed"}
                className="w-full bg-transparent border-b border-black/20 focus:border-[#8B735B] py-1.5 text-sm text-[#1C1C1C] placeholder:text-stone-400 outline-none font-urdu transition-colors"
              />
            </div>
          </div>

          {/* CNIC */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1C1C1C] font-urdu">
              قومی شناختی کارڈ نمبر (CNIC Number)
            </label>
            <div className="relative">
              <input
                type="text"
                name="cnic"
                value={applicant.cnic}
                onChange={handleInputChange}
                placeholder="35202-1245890-1"
                className="w-full bg-transparent border-b border-black/20 focus:border-[#8B735B] py-1.5 text-sm text-[#1C1C1C] placeholder:text-stone-400 outline-none font-sans transition-colors"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1C1C1C] font-urdu">
              موبائل / رابطہ نمبر (Mobile Number)
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={applicant.phone}
                onChange={handleInputChange}
                placeholder="0300-4589012"
                className="w-full bg-transparent border-b border-black/20 focus:border-[#8B735B] py-1.5 text-sm text-[#1C1C1C] placeholder:text-stone-400 outline-none font-sans transition-colors"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1C1C1C] font-urdu">
              موجودہ پتہ (Street Address)
            </label>
            <div className="relative">
              <input
                type="text"
                name="address"
                value={applicant.address}
                onChange={handleInputChange}
                placeholder={outputLanguage === "Urdu" ? "مکان نمبر ۴۵، بلاک بی، ماڈل ٹاؤن" : "House 45, Block B, Model Town"}
                className="w-full bg-transparent border-b border-black/20 focus:border-[#8B735B] py-1.5 text-sm text-[#1C1C1C] placeholder:text-stone-400 outline-none font-urdu transition-colors"
              />
            </div>
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1C1C1C] font-urdu">
              ضلع / شہر (City / District)
            </label>
            <div className="relative">
              <input
                type="text"
                name="city"
                value={applicant.city}
                onChange={handleInputChange}
                placeholder={outputLanguage === "Urdu" ? "مثلاً: لاہور / کراچی / اسلام آباد" : "e.g. Lahore / Karachi"}
                className="w-full bg-transparent border-b border-black/20 focus:border-[#8B735B] py-1.5 text-sm text-[#1C1C1C] placeholder:text-stone-400 outline-none font-urdu transition-colors"
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

