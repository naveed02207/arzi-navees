import React, { useState } from "react";
import { ApplicantDetails } from "../types";
import { User, Phone, CreditCard, MapPin, Calendar, ChevronDown, ChevronUp, UserCheck } from "lucide-react";

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
        name: "علی احمد",
        fatherName: "محمد حسن",
        cnic: "35202-1234567-1",
        phone: "0300-1234567",
        address: "مکان نمبر ۱۲، گلی نمبر ۵، ماڈل ٹاؤن",
        city: "لاہور",
        date: new Date().toISOString().split("T")[0],
      });
    } else {
      onChange({
        name: "Ali Ahmed",
        fatherName: "Muhammad Hassan",
        cnic: "35202-1234567-1",
        phone: "0300-1234567",
        address: "House No 12, Street 5, Model Town",
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

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <UserCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm sm:text-base font-semibold text-slate-200 font-urdu">
            ۲. سائل / درخواست دہندہ کی تفصیلات (Applicant Information)
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              autofillPlaceholders();
            }}
            className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-urdu border border-slate-700"
          >
            مثالی کوائف درج کریں
          </button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu">
              سائل کا مکمل نام (Applicant Name)
            </label>
            <div className="relative">
              <User className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="name"
                value={applicant.name}
                onChange={handleInputChange}
                placeholder={outputLanguage === "Urdu" ? "مثلاً: علی احمد" : "e.g. Ali Ahmed"}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-urdu"
              />
            </div>
          </div>

          {/* Father/Husband Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu">
              ولدیت / زوجیت (Father/Husband Name)
            </label>
            <div className="relative">
              <User className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="fatherName"
                value={applicant.fatherName}
                onChange={handleInputChange}
                placeholder={outputLanguage === "Urdu" ? "مثلاً: محمد حسن" : "e.g. Muhammad Hassan"}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-urdu"
              />
            </div>
          </div>

          {/* CNIC */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu">
              قومی شناختی کارڈ نمبر (CNIC Number)
            </label>
            <div className="relative">
              <CreditCard className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="cnic"
                value={applicant.cnic}
                onChange={handleInputChange}
                placeholder="35202-XXXXXXX-X"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-sans"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu">
              موبائل / رابطہ نمبر (Mobile Number)
            </label>
            <div className="relative">
              <Phone className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="phone"
                value={applicant.phone}
                onChange={handleInputChange}
                placeholder="0300-1234567"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-sans"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu">
              موجودہ پتہ (Street Address)
            </label>
            <div className="relative">
              <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="address"
                value={applicant.address}
                onChange={handleInputChange}
                placeholder={outputLanguage === "Urdu" ? "مکان نمبر، گلی، محلہ" : "House, Street, Area"}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-urdu"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu">
              ضلع / شہر (City / District)
            </label>
            <div className="relative">
              <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="city"
                value={applicant.city}
                onChange={handleInputChange}
                placeholder={outputLanguage === "Urdu" ? "مثلاً: لاہور / کراچی / اسلام آباد" : "e.g. Lahore / Karachi"}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-urdu"
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
