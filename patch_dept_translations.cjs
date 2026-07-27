const fs = require('fs');

const newKeysEn = `
    guide_police_office: "Police Station",
    guide_police_person: "Station House Officer (SHO)",
    guide_police_reason: "This office has jurisdiction over FIR registration.",
    guide_police_docs: "CNIC Copy,Evidence,Witness Details",
    guide_police_escalation: "SHO,DPO,RPO,Provincial Police Complaint Cell",
    guide_police_timing: "24/7",
    
    guide_nadra_office: "NADRA Registration Centre",
    guide_nadra_person: "Center In-charge",
    guide_nadra_reason: "This office manages national identity records.",
    guide_nadra_docs: "Old CNIC,B-Form,Biometrics",
    guide_nadra_escalation: "Center In-charge,Regional Head Office,Chairman NADRA,Wafaqi Mohtasib",
    guide_nadra_timing: "9:00 AM - 5:00 PM",
    
    guide_wapda_office: "WAPDA Customer Service Center",
    guide_wapda_person: "Sub-Divisional Officer (SDO)",
    guide_wapda_reason: "Responsible for billing and meter operations.",
    guide_wapda_docs: "Latest Bill,Meter Photograph,CNIC",
    guide_wapda_escalation: "SDO,XEN,SE,Wafaqi Mohtasib",
    guide_wapda_timing: "9:00 AM - 5:00 PM",
    
    guide_edu_office: "Registrar Office / Examination Branch",
    guide_edu_person: "Controller of Examinations / Registrar",
    guide_edu_reason: "Manages student affairs and academic records.",
    guide_edu_docs: "Student Card,Fee Challan,Transcript",
    guide_edu_escalation: "Registrar,Vice Chancellor,HEC",
    guide_edu_timing: "8:00 AM - 4:00 PM",
    
    guide_muni_office: "Municipal Complaint Cell",
    guide_muni_person: "Chief Officer / Administrator",
    guide_muni_reason: "Handles civic issues and municipal services.",
    guide_muni_docs: "CNIC,Area Details / Evidence,Tax Receipt (if applicable)",
    guide_muni_escalation: "Chief Officer,Deputy Commissioner,Punjab Ombudsman",
    guide_muni_timing: "9:00 AM - 5:00 PM",
    
    guide_gen_office: "Deputy Commissioner Office",
    guide_gen_person: "Deputy Commissioner (DC)",
    guide_gen_reason: "Top administrative authority in the district.",
    guide_gen_docs: "CNIC Copy,Written Application,Relevant Proof",
    guide_gen_escalation: "Deputy Commissioner,Commissioner,Ombudsman",
    guide_gen_timing: "9:00 AM - 5:00 PM",
`;

const newKeysUr = `
    guide_police_office: "تھانہ",
    guide_police_person: "ایس ایچ او (SHO)",
    guide_police_reason: "ایف آئی آر (FIR) درج کرنے کا اختیار اسی دفتر کو ہے۔",
    guide_police_docs: "شناختی کارڈ کی کاپی,ثبوت,گواہان کی تفصیل",
    guide_police_escalation: "ایس ایچ او (SHO),ڈی پی او (DPO),آر پی او (RPO),صوبائی پولیس کمپلینٹ سیل",
    guide_police_timing: "24/7",
    
    guide_nadra_office: "نادرا رجسٹریشن سینٹر",
    guide_nadra_person: "سینٹر انچارج",
    guide_nadra_reason: "یہ دفتر قومی شناختی ریکارڈ کا انتظام کرتا ہے۔",
    guide_nadra_docs: "پرانا شناختی کارڈ,ب-فارم,بائیو میٹرکس",
    guide_nadra_escalation: "سینٹر انچارج,ریجنل ہیڈ آفس,چیئرمین نادرا,وفاقی محتسب",
    guide_nadra_timing: "9:00 AM - 5:00 PM",
    
    guide_wapda_office: "واپڈا کسٹمر سروس سینٹر",
    guide_wapda_person: "ایس ڈی او (SDO)",
    guide_wapda_reason: "بلنگ اور میٹر کے معاملات کا ذمہ دار ہے۔",
    guide_wapda_docs: "حالیہ بل,میٹر کی تصویر,شناختی کارڈ",
    guide_wapda_escalation: "ایس ڈی او (SDO),ایکسین (XEN),ایس ای (SE),وفاقی محتسب",
    guide_wapda_timing: "9:00 AM - 5:00 PM",
    
    guide_edu_office: "رجسٹرار آفس / امتحانات برانچ",
    guide_edu_person: "کنٹرولر امتحانات / رجسٹرار",
    guide_edu_reason: "طلباء کے معاملات اور تعلیمی ریکارڈ کا انتظام کرتا ہے۔",
    guide_edu_docs: "سٹوڈنٹ کارڈ,فیس چالان,ٹرانسکرپٹ",
    guide_edu_escalation: "رجسٹرار,وائس چانسلر,ایچ ای سی (HEC)",
    guide_edu_timing: "8:00 AM - 4:00 PM",
    
    guide_muni_office: "میونسپل کمپلینٹ سیل",
    guide_muni_person: "چیف آفیسر / ایڈمنسٹریٹر",
    guide_muni_reason: "شہری مسائل اور میونسپل خدمات کو ہینڈل کرتا ہے۔",
    guide_muni_docs: "شناختی کارڈ,علاقے کی تفصیل / ثبوت,پراپرٹی ٹیکس رسید (اگر ہو)",
    guide_muni_escalation: "چیف آفیسر,ڈپٹی کمشنر,پنجاب محتسب",
    guide_muni_timing: "9:00 AM - 5:00 PM",
    
    guide_gen_office: "ڈپٹی کمشنر آفس",
    guide_gen_person: "ڈپٹی کمشنر (DC)",
    guide_gen_reason: "ضلع کی سب سے بڑی انتظامی اتھارٹی ہے۔",
    guide_gen_docs: "شناختی کارڈ کی کاپی,تحریری درخواست,متعلقہ ثبوت",
    guide_gen_escalation: "ڈپٹی کمشنر,کمشنر,محتسب",
    guide_gen_timing: "9:00 AM - 5:00 PM",
`;

const newKeysRoman = `
    guide_police_office: "Police Station",
    guide_police_person: "Station House Officer (SHO)",
    guide_police_reason: "FIR darj karne ka ikhtiyar isi daftar ko hai.",
    guide_police_docs: "CNIC Copy,Saboot,Gawahan ki Tafseel",
    guide_police_escalation: "SHO,DPO,RPO,Provincial Police Complaint Cell",
    guide_police_timing: "24/7",
    
    guide_nadra_office: "NADRA Registration Centre",
    guide_nadra_person: "Center In-charge",
    guide_nadra_reason: "Yeh daftar qaumi shanakhti record ka intizam karta hai.",
    guide_nadra_docs: "Purana CNIC,B-Form,Biometrics",
    guide_nadra_escalation: "Center In-charge,Regional Head Office,Chairman NADRA,Wafaqi Mohtasib",
    guide_nadra_timing: "9:00 AM - 5:00 PM",
    
    guide_wapda_office: "WAPDA Customer Service Center",
    guide_wapda_person: "Sub-Divisional Officer (SDO)",
    guide_wapda_reason: "Billing aur meter ke mamlat ka zimma dar hai.",
    guide_wapda_docs: "Haliya Bill,Meter ki Tasveer,CNIC",
    guide_wapda_escalation: "SDO,XEN,SE,Wafaqi Mohtasib",
    guide_wapda_timing: "9:00 AM - 5:00 PM",
    
    guide_edu_office: "Registrar Office / Examination Branch",
    guide_edu_person: "Controller of Examinations / Registrar",
    guide_edu_reason: "Tulba ke mamlat aur taleemi record ka intizam karta hai.",
    guide_edu_docs: "Student Card,Fee Challan,Transcript",
    guide_edu_escalation: "Registrar,Vice Chancellor,HEC",
    guide_edu_timing: "8:00 AM - 4:00 PM",
    
    guide_muni_office: "Municipal Complaint Cell",
    guide_muni_person: "Chief Officer / Administrator",
    guide_muni_reason: "Shehri masail aur municipal khidmat ko handle karta hai.",
    guide_muni_docs: "CNIC,Ilaqay ki Tafseel / Saboot,Property Tax Raseed (agar ho)",
    guide_muni_escalation: "Chief Officer,Deputy Commissioner,Punjab Ombudsman",
    guide_muni_timing: "9:00 AM - 5:00 PM",
    
    guide_gen_office: "Deputy Commissioner Office",
    guide_gen_person: "Deputy Commissioner (DC)",
    guide_gen_reason: "Zilay ki sab se bari intezami authority hai.",
    guide_gen_docs: "CNIC Copy,Tehreeri Darkhwast,Mutaliqa Saboot",
    guide_gen_escalation: "Deputy Commissioner,Commissioner,Ombudsman",
    guide_gen_timing: "9:00 AM - 5:00 PM",
`;

let code = fs.readFileSync('src/translations.ts', 'utf8');

code = code.replace(/guide_on_maps: "on Google Maps.",\n/g, 'guide_on_maps: "on Google Maps.",\n' + newKeysEn);
code = code.replace(/guide_on_maps: "گوگل میپس پر تلاش کریں۔",\n/g, 'guide_on_maps: "گوگل میپس پر تلاش کریں۔",\n' + newKeysUr);
code = code.replace(/guide_on_maps: "Google Maps par talash karein.",\n/g, 'guide_on_maps: "Google Maps par talash karein.",\n' + newKeysRoman);

fs.writeFileSync('src/translations.ts', code);
