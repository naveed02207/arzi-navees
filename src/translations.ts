export const translations = {
  en: {
    hero_title: "Welcome to Arzi-Navees",
    hero_subtitle: "Transform informal complaints into official, legally sound administrative applications instantly.",
    btn_start: "Start Drafting",
    nav_home: "Home",
    nav_services: "Services",
    nav_templates: "Templates",
    nav_settings: "Settings",
    lbl_department: "01. TARGET DEPARTMENT",
    lbl_applicant: "02. APPLICANT DETAILS",
    lbl_grievance: "03. RAW GRIEVANCE",
    placeholder_name: "Applicant Name",
    placeholder_cnic: "CNIC Number",
    placeholder_mobile: "Mobile Number",
    placeholder_address: "Street Address",
    placeholder_city: "City / District",
    btn_generate: "Generate Official Application",
    preview_title: "04. OFFICIAL DRAFT PREVIEW"
  },
  ur: {
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
    preview_title: "04. قانونی درخواست کا باضابطہ پیش نظارہ"
  },
  roman: {
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
    preview_title: "04. Qanooni Darkhwast Ka Preview"
  }
};

export type Language = 'en' | 'ur' | 'roman';
export type TranslationKey = keyof typeof translations.en;
