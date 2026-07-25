const fs = require('fs');

const code = `export const translations = {
  en: {
    departments: [
      {
        id: "police",
        name: "Police Department (FIR & Complaints)",
        officerTitle: "To, The Station House Officer (SHO)",
        iconName: "ShieldAlert",
        badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        officerLabel: "COMPETENT OFFICER:",
        samplesTitle: "Preset Quick Samples:",
        samples: [
          {
            title: "Lost Mobile / CNIC Application",
            description: "My mobile phone and CNIC were lost in the market. I need to file a police report to get a receiving copy."
          },
          {
            title: "House Burglary / Theft FIR Request",
            description: "Last night, unknown thieves broke into my house and stole cash and jewelry. Please register an FIR."
          },
          {
            title: "Harassment & Property Dispute",
            description: "A neighbor is illegally occupying a shared street area and threatening me with dire consequences."
          }
        ]
      },
      {
        id: "wapda",
        name: "WAPDA & Power Utilities (LESCO/KE)",
        officerTitle: "To, The Sub-Divisional Officer (SDO)",
        iconName: "Zap",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        officerLabel: "COMPETENT OFFICER:",
        samplesTitle: "Preset Quick Samples:",
        samples: [
          {
            title: "Electricity Overbilling Correction",
            description: "I received a bill of Rs. 40,000 this month, whereas my actual meter reading is only 200 units. Please correct the bill."
          },
          {
            title: "Burnt Meter Replacement",
            description: "My electricity meter burnt out due to a short circuit. Please restore the supply and install a new meter."
          },
          {
            title: "Faulty Neighborhood Transformer",
            description: "The neighborhood transformer has been burnt for three days. Please repair it immediately."
          }
        ]
      },
      {
        id: "municipal",
        name: "Municipal Committee / WASA / TMA",
        officerTitle: "To, The Chief Officer / Administrator",
        iconName: "Building2",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        officerLabel: "COMPETENT OFFICER:",
        samplesTitle: "Preset Quick Samples:",
        samples: [
          {
            title: "Sewerage Overflow & Drainage",
            description: "Sewage water is overflowing in the street due to blocked drains. Please clean the drainage system."
          },
          {
            title: "Contaminated / Missing Water Supply",
            description: "There has been no water supply for a week, and when it comes, it is contaminated. Please ensure clean water supply."
          }
        ]
      },
      {
        id: "nadra",
        name: "NADRA (National Database)",
        officerTitle: "To, The In-charge, NADRA Registration Center",
        iconName: "FileCheck2",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        officerLabel: "COMPETENT OFFICER:",
        samplesTitle: "Preset Quick Samples:",
        samples: [
          {
            title: "CNIC Name Spelling Rectification",
            description: "My name is spelled incorrectly on my CNIC. Please correct it according to my educational certificates."
          },
          {
            title: "Family Tree (FRC) Error Fix",
            description: "My brother's name is missing from my Family Registration Certificate (FRC). Please update the record."
          }
        ]
      },
      {
        id: "education",
        name: "Educational Boards & Universities",
        officerTitle: "To, The Controller of Examinations",
        iconName: "GraduationCap",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        officerLabel: "COMPETENT OFFICER:",
        samplesTitle: "Preset Quick Samples:",
        samples: [
          {
            title: "University Fee Installment Request",
            description: "Due to poor financial conditions, I cannot pay the full semester fee at once. Please allow me to pay in installments."
          },
          {
            title: "Urgent Degree Verification",
            description: "I need urgent degree verification for a foreign visa application. Please process this request on a priority basis."
          }
        ]
      },
      {
        id: "general",
        name: "Deputy Commissioner / Ombudsman Office",
        officerTitle: "To, The Deputy Commissioner (DC)",
        iconName: "Landmark",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        officerLabel: "COMPETENT OFFICER:",
        samplesTitle: "Preset Quick Samples:",
        samples: [
          {
            title: "Illegal Profiteering & Price Gouging",
            description: "Local shopkeepers are violating the official rate list and charging exorbitant prices. Please take administrative action."
          },
          {
            title: "Public Administrative Delay Complaint",
            description: "My official file has been delayed without reason for two months. Please hold the responsible officers accountable."
          }
        ]
      }
    ],
    hero_title: "Welcome to Arzi-Navees",
    hero_subtitle: "Instantly transform your everyday complaints into official, formally drafted legal applications.",
    btn_start: "Start Drafting Application",
    nav_home: "Home",
    nav_services: "Services",
    nav_templates: "Templates",
    nav_settings: "Settings",
    lbl_department: "01. Target Department",
    lbl_applicant: "02. Applicant Details",
    lbl_grievance: "03. Complaint / Grievance Details",
    placeholder_name: "Applicant's Full Name",
    placeholder_cnic: "CNIC Number",
    placeholder_mobile: "Mobile Number",
    placeholder_address: "Street Address",
    placeholder_city: "City / District",
    btn_generate: "Generate Official Application",
    preview_title: "04. OFFICIAL DRAFT PREVIEW",
    settings_title: "Application Settings",
    settings_desc: "Manage your auto-fill profile, preferences, and document export settings.",
    settings_autofill_title: "My Details (Auto-Fill)",
    settings_fullname: "Full Name",
    settings_mobile: "Mobile Number",
    settings_city: "City/District",
    settings_save_btn: "Save Details",
    settings_save_success: "Saved successfully!",
    settings_prefs_title: "Application Preferences",
    settings_lang_label: "Default Output Language",
    settings_lang_desc: "Choose the language for the final generated document.",
    settings_export_title: "Document Export Settings",
    settings_font_label: "Print Font Size",
    settings_font_desc: "Larger sizes improve Nastaleeq readability.",
    settings_margin_label: "Document Margins",
    settings_margin_desc: "Adjust margins for official legal paper.",
  },
  ur: {
    departments: [
      {
        id: "police",
        name: "پولیس محکمہ (FIR و درخواست جات)",
        officerTitle: "بخدمت جناب ایس ایچ او صاحب",
        iconName: "ShieldAlert",
        badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        officerLabel: "افسرِ مجاز:",
        samplesTitle: "فوری شکایت کے نمونے (Preset Samples):",
        samples: [
          {
            title: "موبائل فون / گمشدگی شناختی کارڈ",
            description: "میرا موبائل اور شناختی کارڈ بازار میں گم ہو گیا ہے، برائے کرم رپورٹ درج فرما کر تصدیقی رسیّد جاری کریں۔"
          },
          {
            title: "گھر میں چوری کی رپورٹ",
            description: "گزشتہ شب نامعلوم چوروں نے گھر کے تالے توڑ کر نقدی و زیورات چوری کر لیے، قانون کے مطابق باقاعدہ ایف آئی آر درج کی جائے۔"
          },
          {
            title: "ہمسائے سے تنازع و دھمکیاں",
            description: "ہمسایہ گلی کی مشترکہ جگہ پر بدمعاشی سے قبضہ کر رہا ہے اور منع کرنے پر سنگین نتائج کی دھمکیاں دے رہا ہے۔"
          }
        ]
      },
      {
        id: "wapda",
        name: "واپڈا / بجلی کمپنیاں (LESCO/KE/FESCO)",
        officerTitle: "بخدمت جناب ایس ڈی او صاحب (واپڈا)",
        iconName: "Zap",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        officerLabel: "افسرِ مجاز:",
        samplesTitle: "فوری شکایت کے نمونے (Preset Samples):",
        samples: [
          {
            title: "اوور بلنگ کی تصحیح",
            description: "اس ماہ بجلی کا بل چالیس ہزار روپے آیا ہے جبکہ میٹر کی حقیقی ریڈنگ صرف ۲۰۰ یونٹ ہے۔ اوور بلنگ کی تصحیح فرمائی جائے۔"
          },
          {
            title: "سوزیدہ میٹر کی تبدیلی",
            description: "شارٹ سرکٹ کی وجہ سے بجلی کا میٹر جل چکا ہے، سائل کی برقی سپلائی بحال کر کے نیا میٹر نصب کیا جائے۔"
          },
          {
            title: "ٹرانسفارمر کی خرابی",
            description: "محلے کا ٹرانسفارمر گزشتہ تین روز سے جل چکا ہے، سائلین شدید گرمی میں بجلی سے محروم ہیں، فوری ترمیم و بحالی کی جائے۔"
          }
        ]
      },
      {
        id: "municipal",
        name: "بلدیہ / بلدیاتی کمیٹی / واسا (WASA)",
        officerTitle: "بخدمت جناب چیف آفیسر / ایڈمنسٹریٹر صاحب",
        iconName: "Building2",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        officerLabel: "افسرِ مجاز:",
        samplesTitle: "فوری شکایت کے نمونے (Preset Samples):",
        samples: [
          {
            title: "سیوریج کا گندا پانی و نالیوں کی بندش",
            description: "محلے میں سیوریج کی نالیاں ابل رہی ہیں اور گندا پانی گلیوں میں جمع ہے۔ فوری صفائی اور ڈرینیج سسٹم درست کیا جائے۔"
          },
          {
            title: "پینے کے پانی کی عدم فراہمی",
            description: "گزشتہ ایک ہفتے سے سرکاری واٹر سپلائی کی لائن میں پانی نہیں آ رہا، فوری طور پر پاک اور صاف پانی کی فراہمی یقینی بنائی جائے۔"
          }
        ]
      },
      {
        id: "nadra",
        name": "نادرا (NADRA - قومی اندراج)",
        officerTitle: "بخدمت جناب انچارج صاحب نادرا سنٹر",
        iconName: "FileCheck2",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        officerLabel: "افسرِ مجاز:",
        samplesTitle: "فوری شکایت کے نمونے (Preset Samples):",
        samples: [
          {
            title: "شناختی کارڈ پر نام کے املاء کی تصحیح",
            description": "سائل کے شناختی کارڈ پر نام کے املاء کی غلطی درج ہو گئی ہے، تعلیمی اسناد کے مطابق نام کی درستی فرمائی جائے۔"
          },
          {
            title: "فیملی ٹری (FRC) ریکارڈ کی درستی",
            description": "نادرا فیملی رجسٹریشن سرٹیفکیٹ (FRC) میں سائل کے بھائی کا نام غلطی سے حذف ہو گیا ہے، فیملی ریکارڈ اپ ڈیٹ کیا جائے۔"
          }
        ]
      },
      {
        id: "education",
        name: "تعلیمی بورڈز و جامعات (BISE / University)",
        officerTitle: "بخدمت جناب کنٹرولر امتحانات / رجسٹرار صاحب",
        iconName: "GraduationCap",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        officerLabel: "افسرِ مجاز:",
        samplesTitle": "فوری شکایت کے نمونے (Preset Samples):",
        samples: [
          {
            title: "جامعہ کی فیس اقساط میں ادا کرنے کی درخواست",
            description": "سائل کے والد صاحب کی مالی حالت ناگفتہ بہ ہونے کے باعث سمسٹر فیس ایک ساتھ ادا کرنا ناممکن ہے، برائے مہربانی اقساط کی اجازت دی جائے۔"
          },
          {
            title: "ڈگری و سرٹیفکیٹ کی ارجنٹ تصدیق",
            description": "سائل کو غیر ملکی ویزا کے لیے اپنی ڈگری کی ہنگامی بنیادوں پر تصدیق درکار ہے، مرحلہ جلد از جلد مکمل کیا جائے۔"
          }
        ]
      },
      {
        id: "general",
        name: "ڈپٹی کمشنر / محتسبِ اعلیٰ (DC / Ombudsman)",
        officerTitle: "بخدمت جناب ڈپٹی کمشنر صاحب / محتسب اعلیٰ",
        iconName: "Landmark",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        officerLabel: "افسرِ مجاز:",
        samplesTitle: "فوری شکایت کے نمونے (Preset Samples):",
        samples: [
          {
            title: "گراں فروشی و ذخیرہ اندوزی کا ازالہ",
            description": "مقامی مارکیٹ میں دکاندار سرکاری ریٹ لسٹ کی خلاف ورزی کرتے ہوئے گراں فروشی کر رہے ہیں، سخت انتظامی کارروائی کی جائے۔"
          },
          {
            title: "سرکاری محکمے کی عدم توجہی / تاخیر کا ازالہ",
            description": "سائل کا قانونی کیس بلا جواز دو ماہ سے روکا گیا ہے، داد رسی فرما کر ذمہ داران سے جواب طلبی کی جائے۔"
          }
        ]
      }
    ],
    hero_title: "عریضہ نویس میں خوش آمدید",
    hero_subtitle: "اپنی سادہ اور عام فہم شکایات کو فوری طور پر باضابطہ اور قانونی سرکاری درخواستوں میں تبدیل کریں۔",
    btn_start: "درخواست لکھنا شروع کریں",
    nav_home: "مرکزی صفحہ",
    nav_services: "خدمات",
    nav_templates: "نمونے",
    nav_settings: "ترتیبات",
    lbl_department: "01. محکمہ / شعبہ",
    lbl_applicant: "02. سائل / درخواست دہندہ کے کوائف",
    lbl_grievance: "03. شکایت / واقعہ کی خام تفصیلات",
    placeholder_name: "سائل کا مکمل نام",
    placeholder_cnic: "قومی شناختی کارڈ نمبر",
    placeholder_mobile: "موبائل / رابطہ نمبر",
    placeholder_address: "موجودہ پتہ",
    placeholder_city: "ضلع / شہر",
    btn_generate: "باضابطہ قانونی درخواست تیار کریں",
    preview_title: "04. قانونی درخواست کا باضابطہ پیش نظارہ",
    settings_title: "ایپلی کیشن کی ترتیبات",
    settings_desc: "اپنی آٹو فل پروفائل، ترجیحات، اور دستاویز ایکسپورٹ کی ترتیبات کا نظم کریں۔",
    settings_autofill_title: "میری تفصیلات (آٹو فل)",
    settings_fullname: "پورا نام",
    settings_mobile: "موبائل نمبر",
    settings_city: "شہر / ضلع",
    settings_save_btn: "تفصیلات محفوظ کریں",
    settings_save_success: "کامیابی سے محفوظ ہو گیا!",
    settings_prefs_title: "ایپلی کیشن کی ترجیحات",
    settings_lang_label: "پہلے سے طے شدہ آؤٹ پٹ زبان",
    settings_lang_desc: "آخری تیار کردہ دستاویز کی زبان منتخب کریں۔",
    settings_export_title: "دستاویز ایکسپورٹ کی ترتیبات",
    settings_font_label: "پرنٹ فونٹ سائز",
    settings_font_desc: "بڑے سائز نستعلیق کی پڑھنے کی اہلیت کو بہتر بناتے ہیں۔",
    settings_margin_label: "دستاویز کے حاشیے",
    settings_margin_desc: "سرکاری قانونی کاغذ کے لیے حاشیے ایڈجسٹ کریں۔"
  },
  roman: {
    departments: [
      {
        id: "police",
        name: "Police Department (FIR & Complaints)",
        officerTitle: "To, The Station House Officer (SHO)",
        iconName: "ShieldAlert",
        badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        officerLabel: "Afsar-e-Mujaz:",
        samplesTitle: "Fauri Shikayat Ke Namoonay:",
        samples: [
          {
            title: "Lost Mobile / CNIC Application",
            description: "Mera mobile / CNIC market se choori ho gaya hai, police report karwani hai raseed ke liye."
          },
          {
            title: "House Burglary / Theft FIR Request",
            description: "Raat ko ghar ke taalay torr kar chor cash aur zewar le gaye, FIR darj karain."
          },
          {
            title: "Harassment & Property Dispute",
            description: "Hamsaya gali mein zabardasti qabza kar raha hai aur dhamkiyan de raha hai."
          }
        ]
      },
      {
        id: "wapda",
        name: "WAPDA & Power Utilities (LESCO/KE/FESCO)",
        officerTitle: "To, The Sub-Divisional Officer (SDO), WAPDA",
        iconName: "Zap",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        officerLabel: "Afsar-e-Mujaz:",
        samplesTitle: "Fauri Shikayat Ke Namoonay:",
        samples: [
          {
            title: "Electricity Overbilling Correction",
            description: "Is mahine bill 40,000 aya hai jabke meter reading sirf 200 unit hai, bill sahi kia jaye."
          },
          {
            title: "Burnt Meter Replacement",
            description: "Bijli ka meter short circuit se jal gaya hai, naya meter lagwaya jaye."
          },
          {
            title: "Faulty Neighborhood Transformer",
            description: "Gali ka transformer teen din se kharab hai, garmi mein bijli band hai."
          }
        ]
      },
      {
        id: "municipal",
        name: "Municipal Committee / WASA / TMA",
        officerTitle: "To, The Chief Officer / Administrator, Municipal Committee",
        iconName: "Building2",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        officerLabel: "Afsar-e-Mujaz:",
        samplesTitle: "Fauri Shikayat Ke Namoonay:",
        samples: [
          {
            title: "Sewerage Overflow & Drainage",
            description: "Gali mein ganda pani khara hai, naliyan band hain, bimariyan phail rahi hain."
          },
          {
            title: "Contaminated / Missing Water Supply",
            description: "Hafte se nalay mein pani nahi aa raha aur jo ata hai wo ganda hai."
          }
        ]
      },
      {
        id: "nadra",
        name: "NADRA (National Database)",
        officerTitle: "To, The In-charge, NADRA Registration Center",
        iconName: "FileCheck2",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        officerLabel: "Afsar-e-Mujaz:",
        samplesTitle: "Fauri Shikayat Ke Namoonay:",
        samples: [
          {
            title: "CNIC Name Spelling Rectification",
            description: "Mera naam CNIC pe galat likha gaya hai, Matric certificate ke mutabiq sahi kia jaye."
          },
          {
            title: "Family Tree (FRC) Error Fix",
            description: "FRC mein bhai ka naam gayab hai, record update kia jaye."
          }
        ]
      },
      {
        id: "education",
        name: "Educational Boards & Universities",
        officerTitle: "To, The Controller of Examinations / Registrar",
        iconName: "GraduationCap",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        officerLabel: "Afsar-e-Mujaz:",
        samplesTitle: "Fauri Shikayat Ke Namoonay:",
        samples: [
          {
            title: "University Fee Installment Request",
            description: "Mali halat kharab hone ki waja se poori semester fee ek sath nahi de sakta, iqsat kar dain."
          },
          {
            title: "Urgent Degree Verification",
            description: "Job visa ke liye degree ki urgent verification chahiye."
          }
        ]
      },
      {
        id: "general",
        name: "Deputy Commissioner / Ombudsman Office",
        officerTitle: "To, The Deputy Commissioner (DC) / Ombudsman",
        iconName: "Landmark",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        officerLabel: "Afsar-e-Mujaz:",
        samplesTitle: "Fauri Shikayat Ke Namoonay:",
        samples: [
          {
            title: "Illegal Profiteering & Price Gouging",
            description: "Market mein dukan daar sarkari rate list se dugna qeemat wasool kar rahe hain."
          },
          {
            title: "Public Administrative Delay Complaint",
            description: "Mera file do mahine se daftar mein roka gaya hai, koi sunwai nahi ho rahi."
          }
        ]
      }
    ],
    hero_title: "Arzi-Navees Mein Khush Amdeed",
    hero_subtitle: "Apni aam shikayat ko fori tor par ba-zabta aur qanooni sarkaari darkhwast mein tabdeel karein.",
    btn_start: "Darkhwast Likhna Shuru Karein",
    nav_home: "Home",
    nav_services: "Khidmat",
    nav_templates: "Namoonay",
    nav_settings: "Tarteebaat",
    lbl_department: "01. Target Department (Mehkama)",
    lbl_applicant: "02. Saail Ke Kawaif",
    lbl_grievance: "03. Shikayat Ki Tafseel",
    placeholder_name: "Saail Ka Mukammal Naam",
    placeholder_cnic: "CNIC Number",
    placeholder_mobile: "Mobile Number",
    placeholder_address: "Maujooda Pata",
    placeholder_city: "Zila / Shehar",
    btn_generate: "Ba-Zabta Qanooni Darkhwast Tayyar Karein",
    preview_title: "04. Qanooni Darkhwast Ka Preview",
    settings_title: "Application Settings",
    settings_desc: "Apni auto-fill profile, preferences, aur document export settings manage karein.",
    settings_autofill_title: "Meri Tafseelat (Auto-Fill)",
    settings_fullname: "Mukammal Naam",
    settings_mobile: "Mobile Number",
    settings_city: "Shehar / Zila",
    settings_save_btn: "Tafseelat Save Karein",
    settings_save_success: "Kamyabi se save ho gaya!",
    settings_prefs_title: "Application Preferences",
    settings_lang_label: "Default Output Language",
    settings_lang_desc: "Final document ki zaban muntakhib karein.",
    settings_export_title: "Document Export Settings",
    settings_font_label: "Print Font Size",
    settings_font_desc: "Baray size Nastaleeq parhne mein behtar hain.",
    settings_margin_label: "Document Margins",
    settings_margin_desc: "Sarkari kaghaz ke liye margins adjust karein."
  }
};

export type Language = 'en' | 'ur' | 'roman';
export type TranslationKey = keyof typeof translations.en;
`;

fs.writeFileSync('src/translations.ts', code);
console.log("Translations completely rewritten.");
