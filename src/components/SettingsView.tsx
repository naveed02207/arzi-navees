import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Phone, MapPin, Globe, Printer, FileText, Save, Monitor } from 'lucide-react';
import { ApplicantDetails } from '../types';

interface SettingsViewProps {
  printMargin: string;
  onPrintMarginChange: (val: string) => void;
  applicant: ApplicantDetails;
  onApplicantChange: (app: ApplicantDetails) => void;
  outputLanguage: 'Urdu' | 'English';
  onOutputLanguageChange: (lang: 'Urdu' | 'English') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  applicant,
  onApplicantChange,
  outputLanguage,
  onOutputLanguageChange,
  printMargin,
  onPrintMarginChange,
}) => {
  const { t, getTextClass } = useLanguage();
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [profile, setProfile] = useState<ApplicantDetails>(applicant);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    onApplicantChange(profile);
    setSaveStatus(t("settings_saved"));
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="bg-transparent space-y-6">
      <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100 transition-all duration-300">
        <h2 className={getTextClass("text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 text-start")}>
          <User className="w-5 h-5 text-emerald-600" />
          {t("settings_autofill_title")}
        </h2>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="text-start">
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1.5")}>
                {t("settings_fullname")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="M Naveed Ul Hassan"
                  className={getTextClass("w-full ps-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors")}
                />
              </div>
            </div>
            <div className="text-start">
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1.5")}>
                {t("settings_mobile")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="0300-1234567"
                  dir="ltr"
                  className={getTextClass("w-full ps-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors")}
                />
              </div>
            </div>
            <div className="md:col-span-2 text-start">
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1.5")}>
                {t("settings_city")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleProfileChange}
                  placeholder="Vehari"
                  className={getTextClass("w-full ps-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors")}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSaveProfile}
              className={getTextClass("px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2")}
            >
              <Save className="w-4 h-4" />
              {t("settings_save_btn")}
            </button>
            {saveStatus && (
              <span className={getTextClass("text-sm font-medium text-emerald-600 transition-opacity")}>
                {saveStatus}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100 transition-all duration-300">
        <h2 className={getTextClass("text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 text-start")}>
          <Monitor className="w-5 h-5 text-emerald-600" />
          {t("settings_prefs_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 text-start">
            <div>
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1")}>
                {t("settings_lang_label")}
              </label>
              <p className={getTextClass("text-xs text-gray-500 mb-3")}>
                {t("settings_lang_desc")}
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                <Globe className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={outputLanguage}
                onChange={(e) => onOutputLanguageChange(e.target.value as any)}
                className={getTextClass("w-full ps-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 outline-none transition-colors appearance-none")}
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu (اردو)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100 transition-all duration-300">
        <h2 className={getTextClass("text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 text-start")}>
          <Printer className="w-5 h-5 text-emerald-600" />
          {t("settings_export_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 text-start">
            <div>
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1")}>
                {t("settings_font_label")}
              </label>
              <p className={getTextClass("text-xs text-gray-500 mb-3")}>
                {t("settings_font_desc")}
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <select className={getTextClass("w-full ps-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 outline-none transition-colors appearance-none")}>
                <option value="standard">Standard (14pt)</option>
                <option value="large">Large (16pt)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 text-start">
            <div>
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1")}>
                {t("settings_margin_label")}
              </label>
              <p className={getTextClass("text-xs text-gray-500 mb-3")}>
                {t("settings_margin_desc")}
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={printMargin}
                onChange={(e) => onPrintMarginChange(e.target.value)}
                className={getTextClass("w-full ps-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 outline-none transition-colors appearance-none")}
              >
                <option value="standard">Standard (1 inch)</option>
                <option value="stamp">Stamp Paper Margin (Top 3 inches)</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
