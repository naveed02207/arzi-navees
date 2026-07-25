const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Phone, MapPin, Globe, Printer, FileText, Save, Monitor } from 'lucide-react';
import { ApplicantInfo } from './ApplicantForm';

interface SettingsViewProps {
  applicant: ApplicantInfo;
  onApplicantChange: (app: ApplicantInfo) => void;
  outputLanguage: 'Urdu' | 'English';
  onOutputLanguageChange: (lang: 'Urdu' | 'English') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  applicant, 
  onApplicantChange, 
  outputLanguage, 
  onOutputLanguageChange 
}) => {
  const { t, getTextClass } = useLanguage();
  const [profile, setProfile] = useState({
    name: applicant.name || '',
    phone: applicant.phone || '',
    city: applicant.city || ''
  });
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    setProfile({
      name: applicant.name || '',
      phone: applicant.phone || '',
      city: applicant.city || ''
    });
  }, [applicant]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    onApplicantChange({ ...applicant, ...profile });
    setSaveStatus('Saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="mb-8">
        <h1 className={getTextClass("text-3xl font-serif font-bold text-gray-900 ")}>
          Application Settings
        </h1>
        <p className={getTextClass("text-gray-500 mt-2")}>
          Manage your auto-fill profile, preferences, and document export settings.
        </p>
      </div>

      {/* Section 1: Auto-Fill Profile */}
      <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100 transition-all duration-300">
        <h2 className={getTextClass("text-xl font-bold text-gray-900 mb-6 flex items-center gap-2")}>
          <User className="w-5 h-5 text-emerald-600 " />
          My Details (Auto-Fill)
        </h2>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1.5")}>
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="M Naveed Ul Hassan"
                  className={getTextClass("w-full pl-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors")}
                />
              </div>
            </div>
            <div>
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1.5")}>
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="0300-1234567"
                  dir="ltr"
                  className={getTextClass("w-full pl-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors")}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1.5")}>
                City/District
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleProfileChange}
                  placeholder="Vehari"
                  className={getTextClass("w-full pl-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors")}
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
              Save Details
            </button>
            {saveStatus && (
              <span className={getTextClass("text-sm font-medium text-emerald-600 transition-opacity")}>
                {saveStatus}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: App Preferences */}
      <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100 transition-all duration-300">
        <h2 className={getTextClass("text-xl font-bold text-gray-900 mb-6 flex items-center gap-2")}>
          <Monitor className="w-5 h-5 text-emerald-600 " />
          Application Preferences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div>
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1")}>
                Default Output Language
              </label>
              <p className={getTextClass("text-xs text-gray-500 mb-3")}>
                Choose the language for the final generated document.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={outputLanguage}
                onChange={(e) => onOutputLanguageChange(e.target.value as any)}
                className={getTextClass("w-full pl-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 outline-none transition-colors appearance-none")}
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu (اردو)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: PDF Export Settings */}
      <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100 transition-all duration-300">
        <h2 className={getTextClass("text-xl font-bold text-gray-900 mb-6 flex items-center gap-2")}>
          <Printer className="w-5 h-5 text-emerald-600 " />
          Document Export Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div>
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1")}>
                Print Font Size
              </label>
              <p className={getTextClass("text-xs text-gray-500 mb-3")}>
                Larger sizes improve Nastaleeq readability.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <select className={getTextClass("w-full pl-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 outline-none transition-colors appearance-none")}>
                <option value="standard">Standard (14pt)</option>
                <option value="large">Large (16pt)</option>
              </select>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className={getTextClass("block text-sm font-semibold text-gray-700 mb-1")}>
                Document Margins
              </label>
              <p className={getTextClass("text-xs text-gray-500 mb-3")}>
                Adjust margins for official legal paper.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <select className={getTextClass("w-full pl-10 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg py-2.5 text-sm text-gray-900 outline-none transition-colors appearance-none")}>
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
`;

fs.writeFileSync('src/components/SettingsView.tsx', code);
console.log("Rewrote SettingsView");
