export const translations = {
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
    nav_history: "History",
    tpl_use: "Use Template",
    tpl_wapda_title: "WAPDA / LESCO",
    tpl_wapda_desc: "Overbilling & Unit Correction",
    tpl_police_title: "Police FIR",
    tpl_police_desc: "Stolen Mobile Phone / Motorcycle",
    tpl_municipal_title: "Municipal Committee",
    tpl_municipal_desc: "Street Sanitation & Drainage",
    tpl_education_title: "University",
    tpl_education_desc: "Degree Issuance & Clearance",
    tpl_nadra_title: "NADRA",
    tpl_nadra_desc: "CNIC Name/Address Correction",
    tpl_header: "Ready-to-Use Templates",
    tpl_header_desc: "Choose from our library of standard application templates. We will auto-fill the target department and a sample raw grievance to get you started instantly.",
    nav_templates: "Templates",
    nav_settings: "Settings",
    lbl_department: "01. Target Department",
    lbl_department_desc: "Select the relevant department or directorate for your application",
    lbl_applicant: "02. Applicant Details",
    lbl_grievance: "03. Complaint / Grievance Details",
    placeholder_name: "Applicant's Full Name",
    placeholder_cnic: "CNIC Number",
    placeholder_mobile: "Mobile Number",
    placeholder_address: "Street Address",
    placeholder_city: "City / District",
    btn_generate: "Generate Official Application",
    txt_saved_drafts: "Saved Drafts",
    txt_no_saved_drafts: "No drafts saved yet.",
    txt_reopen: "Re-open",
    txt_delete: "Delete",
    txt_clear_all: "Clear All Records",
    txt_legal_advisory: "Legal & Administrative Advisory",
    txt_question_label: "Question: ",
    txt_legal_loading: "Preparing legal advice...",
    btn_close: "Close",
    txt_guide_title: "Pakistan Public Service Guide",
    btn_close_understood: "Understood (Close)",
    txt_saved_locally: "Your details are saved locally for future use",
    btn_auto_fill: "Auto-fill",
    placeholder_father_name: "Father/Husband Name",
    txt_describe_issue: "Describe your issue here freely in any language",
    txt_output_lang_label: "Output Language:",
    txt_recording: "Recording...",
    txt_dictate: "Dictate in Urdu",
    btn_clear_text: "Clear text",
    txt_char_count: "Character count: ",
    txt_drafting: "Drafting...",
    txt_official_suite: "Official Suite",
    btn_print: "Print Application",
    btn_export_pdf: "Export PDF",
    btn_save: "Save",
    btn_copy: "Copy",
    btn_txt: "TXT",
    btn_edit: "Edit",
    btn_ask_question: "Ask Question",
    btn_reset: "Reset Form",
    doc_gov_pak: "Government of Pakistan",
    doc_title: "Official Administrative Application",
    doc_subtitle: "Public Service & Grievance Helper",
    doc_req_attachments: "Required Attachments",
    doc_applicable_laws: "Applicable Laws",
    doc_next_steps: "Next Steps",
    doc_applicant: "Applicant",
    doc_address: "Address",
    doc_cnic: "CNIC",
    doc_mobile: "Mobile Number",
    doc_date: "Date",
    doc_subject: "Subject",
    doc_respectfully: "Respectfully Submitted",
    doc_action_checklist: "Action Checklist",
    doc_legal_notes: "Legal Notes",
    txt_loading: "Loading",
    txt_error: "Error",
    txt_success: "Success",
    txt_official_draft: "Official Draft",
    txt_ready: "Ready",
    txt_generated_in: "Generated in",
    txt_clipboard: "Clipboard",
    txt_doc_ready: "Document Ready",
    txt_print_ready: "Print Ready",
    txt_no_history: "No History",
    txt_no_templates: "No Templates",
    txt_email: "Email",
    txt_complaint: "Complaint",
    txt_auto_saved: "Auto Saved",
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
    settings_font_standard: "Standard (14pt)",
    settings_font_large: "Large (16pt)",
    settings_margin_standard: "Standard (1 inch)",
    settings_margin_stamp: "Stamp Paper Margin (Top 3 inches)",
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
        name: "نادرا (NADRA - قومی اندراج)",
        officerTitle: "بخدمت جناب انچارج صاحب نادرا سنٹر",
        iconName: "FileCheck2",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        officerLabel: "افسرِ مجاز:",
        samplesTitle: "فوری شکایت کے نمونے (Preset Samples):",
        samples: [
          {
            title: "شناختی کارڈ پر نام کے املاء کی تصحیح",
            description: "سائل کے شناختی کارڈ پر نام کے املاء کی غلطی درج ہو گئی ہے، تعلیمی اسناد کے مطابق نام کی درستی فرمائی جائے۔"
          },
          {
            title: "فیملی ٹری (FRC) ریکارڈ کی درستی",
            description: "نادرا فیملی رجسٹریشن سرٹیفکیٹ (FRC) میں سائل کے بھائی کا نام غلطی سے حذف ہو گیا ہے، فیملی ریکارڈ اپ ڈیٹ کیا جائے۔"
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
        samplesTitle: "فوری شکایت کے نمونے (Preset Samples):",
        samples: [
          {
            title: "جامعہ کی فیس اقساط میں ادا کرنے کی درخواست",
            description: "سائل کے والد صاحب کی مالی حالت ناگفتہ بہ ہونے کے باعث سمسٹر فیس ایک ساتھ ادا کرنا ناممکن ہے، برائے مہربانی اقساط کی اجازت دی جائے۔"
          },
          {
            title: "ڈگری و سرٹیفکیٹ کی ارجنٹ تصدیق",
            description: "سائل کو غیر ملکی ویزا کے لیے اپنی ڈگری کی ہنگامی بنیادوں پر تصدیق درکار ہے، مرحلہ جلد از جلد مکمل کیا جائے۔"
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
            description: "مقامی مارکیٹ میں دکاندار سرکاری ریٹ لسٹ کی خلاف ورزی کرتے ہوئے گراں فروشی کر رہے ہیں، سخت انتظامی کارروائی کی جائے۔"
          },
          {
            title: "سرکاری محکمے کی عدم توجہی / تاخیر کا ازالہ",
            description: "سائل کا قانونی کیس بلا جواز دو ماہ سے روکا گیا ہے، داد رسی فرما کر ذمہ داران سے جواب طلبی کی جائے۔"
          }
        ]
      }
    ],
    hero_title: "عریضہ نویس میں خوش آمدید",
    hero_subtitle: "اپنی سادہ اور عام فہم شکایات کو فوری طور پر باضابطہ اور قانونی سرکاری درخواستوں میں تبدیل کریں۔",
    btn_start: "درخواست لکھنا شروع کریں",
    nav_home: "مرکزی صفحہ",
    nav_services: "خدمات",
    nav_history: "تاریخچہ",
    tpl_use: "ٹیمپلیٹ استعمال کریں",
    tpl_wapda_title: "واپڈا / لیسکو",
    tpl_wapda_desc: "اوور بلنگ اور یونٹ کی تصحیح",
    tpl_police_title: "پولیس ایف آئی آر",
    tpl_police_desc: "موبائل فون یا موٹر سائیکل چوری",
    tpl_municipal_title: "بلدیاتی کمیٹی",
    tpl_municipal_desc: "گلی کی صفائی اور ڈرینیج",
    tpl_education_title: "یونیورسٹی / تعلیمی بورڈ",
    tpl_education_desc: "ڈگری کا اجراء اور کلیئرنس",
    tpl_nadra_title: "نادرا",
    tpl_nadra_desc: "شناختی کارڈ میں نام/پتہ کی درستی",
    tpl_header: "تیار شدہ ٹیمپلیٹس",
    tpl_header_desc: "ہماری معیاری درخواستوں کی لائبریری سے انتخاب کریں۔ ہم متعلقہ محکمہ اور شکایت کا نمونہ خود بخود بھر دیں گے تاکہ آپ فوراً شروعات کر سکیں۔",
    nav_templates: "نمونے",
    nav_settings: "ترتیبات",
    lbl_department: "01. محکمہ / شعبہ",
    lbl_department_desc: "اپنی درخواست کے لیے متعلقہ محکمہ یا نظامت منتخب کریں",
    lbl_applicant: "02. سائل / درخواست دہندہ کے کوائف",
    lbl_grievance: "03. شکایت / واقعہ کی خام تفصیلات",
    placeholder_name: "سائل کا مکمل نام",
    placeholder_cnic: "قومی شناختی کارڈ نمبر",
    placeholder_mobile: "موبائل / رابطہ نمبر",
    placeholder_address: "موجودہ پتہ",
    placeholder_city: "ضلع / شہر",
    btn_generate: "باضابطہ قانونی درخواست تیار کریں",
    txt_saved_drafts: "محفوظ شدہ درخواستیں",
    txt_no_saved_drafts: "ابھی تک کوئی درخواست محفوظ نہیں کی گئی۔",
    txt_reopen: "دوبارہ کھولیں",
    txt_delete: "حذف کریں",
    txt_clear_all: "تمام ریکارڈ صاف کریں",
    txt_legal_advisory: "قانونی و انتظامی مشورہ (Legal Advisory)",
    txt_question_label: "سوال: ",
    txt_legal_loading: "قانونی مشورہ تیار کیا جا رہا ہے...",
    btn_close: "بند کریں (Close)",
    txt_guide_title: "پاکستان میں سرکاری درخواستی عمل اور شہری حقوق کی رہنمائی",
    btn_close_understood: "سمجھ گئے (Close)",
    txt_saved_locally: "آپ کی تفصیلات مستقبل کے استعمال کے لیے محفوظ کی گئی ہیں",
    btn_auto_fill: "خود پُر کریں",
    placeholder_father_name: "والد/شوہر کا نام",
    txt_describe_issue: "اپنا مسئلہ یہاں کسی بھی زبان میں بلا جھجھک بیان کریں",
    txt_output_lang_label: "زبان خاکہ:",
    txt_recording: "ریکارڈنگ جاری...",
    txt_dictate: "بول کر لکھیں (Urdu Dictation)",
    btn_clear_text: "متن صاف کریں",
    txt_char_count: "حروف کی تعداد: ",
    txt_drafting: "مسودہ تیار ہو رہا ہے...",
    txt_official_suite: "آفیشل سویٹ",
    btn_print: "درخواست پرنٹ کریں",
    btn_export_pdf: "پی ڈی ایف ایکسپورٹ کریں",
    btn_save: "محفوظ کریں",
    btn_copy: "کاپی کریں",
    btn_txt: "ٹیکسٹ",
    btn_edit: "ترمیم کریں",
    btn_ask_question: "سوال پوچھیں",
    btn_reset: "فارم ری سیٹ کریں",
    doc_gov_pak: "حکومتِ پاکستان",
    doc_title: "سرکاری انتظامی درخواست",
    doc_subtitle: "عوامی شکایات و درخواست معاون",
    doc_req_attachments: "ضروری منسلک دستاویزات",
    doc_applicable_laws: "متعلقہ قوانین",
    doc_next_steps: "اگلے مراحل",
    doc_applicant: "درخواست گزار",
    doc_address: "پتہ",
    doc_cnic: "شناختی کارڈ نمبر",
    doc_mobile: "موبائل نمبر",
    doc_date: "تاریخ",
    doc_subject: "موضوع",
    doc_respectfully: "باادب گزارش ہے",
    doc_action_checklist: "ایکشن چیک لسٹ",
    doc_legal_notes: "قانونی رہنمائی",
    txt_loading: "لوڈ ہو رہا ہے",
    txt_error: "خرابی",
    txt_success: "کامیابی",
    txt_official_draft: "سرکاری مسودہ",
    txt_ready: "تیار",
    txt_generated_in: "تیار کردہ",
    txt_clipboard: "کلپ بورڈ",
    txt_doc_ready: "دستاویز تیار ہے",
    txt_print_ready: "پرنٹ کے لیے تیار",
    txt_no_history: "کوئی تاریخچہ نہیں",
    txt_no_templates: "کوئی ٹیمپلیٹ نہیں",
    txt_email: "ای میل",
    txt_complaint: "شکایت",
    txt_auto_saved: "خود بخود محفوظ ہو گیا",
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
    settings_margin_desc: "سرکاری قانونی کاغذ کے لیے حاشیے ایڈجسٹ کریں۔",
    settings_font_standard: "معیاری (14pt)",
    settings_font_large: "بڑا (16pt)",
    settings_margin_standard: "معیاری (1 انچ)",
    settings_margin_stamp: "اشٹام پیپر مارجن (اوپر 3 انچ)",
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
    nav_history: "Tareekh",
    tpl_use: "Template Istemal Karein",
    tpl_wapda_title: "WAPDA / LESCO",
    tpl_wapda_desc: "Overbilling Aur Unit Theek Karwana",
    tpl_police_title: "Police FIR",
    tpl_police_desc: "Chori Shuda Mobile / Motorcycle",
    tpl_municipal_title: "Municipal Committee",
    tpl_municipal_desc: "Gali Ki Safai Aur Gutter",
    tpl_education_title: "University / Board",
    tpl_education_desc: "Degree Issue Aur Clearance",
    tpl_nadra_title: "NADRA",
    tpl_nadra_desc: "CNIC Par Naam/Address Theek Karwana",
    tpl_header: "Tayyar Shuda Templates",
    tpl_header_desc: "Hamari library se standard application templates chunein. Hum mutaliqa mehkama aur shikayat ka namuna khud bhar denge taake aap fauran shuru kar sakein.",
    nav_templates: "Namoonay",
    nav_settings: "Tarteebaat",
    lbl_department: "01. Target Department (Mehkama)",
    lbl_department_desc: "Apni darkhwast ke liye mutaliqa mehkama muntakhib karein",
    lbl_applicant: "02. Saail Ke Kawaif",
    lbl_grievance: "03. Shikayat Ki Tafseel",
    placeholder_name: "Saail Ka Mukammal Naam",
    placeholder_cnic: "CNIC Number",
    placeholder_mobile: "Mobile Number",
    placeholder_address: "Maujooda Pata",
    placeholder_city: "Zila / Shehar",
    btn_generate: "Ba-Zabta Qanooni Darkhwast Tayyar Karein",
    txt_saved_drafts: "Mehfooz Shuda Darkhwastain",
    txt_no_saved_drafts: "Koi darkhwast save nahi hui abhi tak.",
    txt_reopen: "Dobara Kholein",
    txt_delete: "Delete Karein",
    txt_clear_all: "Tamam Record Saaf Karein",
    txt_legal_advisory: "Qanooni aur Intizami Mashwara",
    txt_question_label: "Sawal: ",
    txt_legal_loading: "Qanooni mashwara tayyar kiya ja raha hai...",
    btn_close: "Band Karein",
    txt_guide_title: "Pakistan mein sarkaari darkhwasti amal aur shehri haqooq ki rehnumai",
    btn_close_understood: "Samajh gaye",
    txt_saved_locally: "Aap ki tafseelat future ke liye save hain",
    btn_auto_fill: "Auto-fill Karein",
    placeholder_father_name: "Walid/Shohar ka Naam",
    txt_describe_issue: "Apna masla kisi bhi zaban mein tafseel se bayan karein",
    txt_output_lang_label: "Zaban Khaka:",
    txt_recording: "Recording...",
    txt_dictate: "Urdu mein Dictation karein",
    btn_clear_text: "Text saaf karein",
    txt_char_count: "Haroof ki taadad: ",
    txt_drafting: "Drafting...",
    txt_official_suite: "Official Suite",
    btn_print: "Darkhwast Print Karein",
    btn_export_pdf: "PDF Export Karein",
    btn_save: "Save Karein",
    btn_copy: "Copy Karein",
    btn_txt: "TXT",
    btn_edit: "Edit Karein",
    btn_ask_question: "Sawal Pochein",
    btn_reset: "Form Reset Karein",
    doc_gov_pak: "Government of Pakistan",
    doc_title: "Sarkaari Intizami Darkhwast",
    doc_subtitle: "Awami Shikayat Helper",
    doc_req_attachments: "Zaroori Munsalik Dastawezat",
    doc_applicable_laws: "Mutaliqa Qawaneen",
    doc_next_steps: "Aglay Marahil",
    doc_applicant: "Saail",
    doc_address: "Pata",
    doc_cnic: "CNIC",
    doc_mobile: "Mobile Number",
    doc_date: "Tareekh",
    doc_subject: "Mauzoo",
    doc_respectfully: "Ba-adab Guzarish Hai",
    doc_action_checklist: "Action Checklist",
    doc_legal_notes: "Qanooni Rehnumai",
    txt_loading: "Load ho raha hai",
    txt_error: "Error",
    txt_success: "Success",
    txt_official_draft: "Official Draft",
    txt_ready: "Ready",
    txt_generated_in: "Generated in",
    txt_clipboard: "Clipboard",
    txt_doc_ready: "Document Ready",
    txt_print_ready: "Print Ready",
    txt_no_history: "No History",
    txt_no_templates: "No Templates",
    txt_email: "Email",
    txt_complaint: "Shikayat",
    txt_auto_saved: "Auto Saved",
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
    settings_margin_desc: "Sarkari kaghaz ke liye margins adjust karein.",
    settings_font_standard: "Standard (14pt)",
    settings_font_large: "Large (16pt)",
    settings_margin_standard: "Standard (1 inch)",
    settings_margin_stamp: "Stamp Paper Margin (Top 3 inches)",
  }
};

export type Language = 'en' | 'ur' | 'roman';
export type TranslationKey = keyof typeof translations.en;
