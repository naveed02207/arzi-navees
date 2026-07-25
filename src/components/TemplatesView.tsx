import React from 'react';
import { Department, DEPARTMENTS } from '../data/departments';
import { Zap, ShieldAlert, Trash2, GraduationCap, CreditCard, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ViewState } from './Sidebar';

interface TemplatesViewProps {
  setActiveView: (view: ViewState) => void;
  onSelectTemplate: (department: Department, sampleRoman: string) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ setActiveView, onSelectTemplate }) => {
  const { t, getTextClass } = useLanguage();
  
  // Data array
  const templates = [
    {
      id: 'wapda',
      title: 'WAPDA / LESCO',
      desc: 'Overbilling & Unit Correction',
      icon: Zap,
      deptId: 'wapda',
      sample: 'Is mahine bill 40,000 aya hai jabke meter reading sirf 200 unit hai, bill sahi kia jaye.'
    },
    {
      id: 'police',
      title: 'Police FIR',
      desc: 'Stolen Mobile Phone / Motorcycle',
      icon: ShieldAlert,
      deptId: 'police',
      sample: 'Mera mobile / motorcycle market se choori ho gaya hai, police report karwani hai raseed ke liye.'
    },
    {
      id: 'municipal',
      title: 'Municipal Committee',
      desc: 'Street Sanitation & Drainage',
      icon: Trash2,
      deptId: 'municipal',
      sample: 'Gali mein gatar ubal raha hai aur kachra para hai, pichle ek mahine se koi safai wala nahi aya.'
    },
    {
      id: 'education',
      title: 'University',
      desc: 'Degree Issuance & Clearance',
      icon: GraduationCap,
      deptId: 'education',
      sample: 'Main ne BS complete kar lia hai, meri degree aur clearance certificate jaldi issue ki jaye.'
    },
    {
      id: 'nadra',
      title: 'NADRA',
      desc: 'CNIC Name/Address Correction',
      icon: CreditCard,
      deptId: 'nadra',
      sample: 'Mera CNIC par naam ki spelling ghalat print ho gai hai, isko theek kia jaye.'
    }
  ];

  const handleUseTemplate = (template: any) => {
    const dept = DEPARTMENTS.find(d => d.id === template.deptId);
    if (dept) {
      onSelectTemplate(dept, template.sample);
      setActiveView('services');
    }
  };

  return (
    <div className="bg-transparent space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
        <h2 className={getTextClass("text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2")}>
          Ready-to-Use Templates
        </h2>
        <p className={getTextClass("text-gray-500 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed")}>
          Choose from our library of standard application templates. We will auto-fill the target department and a sample raw grievance to get you started instantly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div key={tpl.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <tpl.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={getTextClass("font-bold text-gray-900 dark:text-white text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors")}>
                    {tpl.title}
                  </h3>
                  <p className={getTextClass("text-sm text-gray-500 dark:text-gray-400 mt-1")}>
                    {tpl.desc}
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => handleUseTemplate(tpl)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-semibold hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-colors"
                >
                  <span className={getTextClass("")}>Use Template</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
