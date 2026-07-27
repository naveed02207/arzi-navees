const fs = require('fs');

const newKeysEn = `
    guide_title: "Government Submission Guide",
    guide_subtitle: "Everything you need after generating your application.",
    guide_submit_to: "Submit To",
    guide_reason: "Reason",
    guide_req_docs: "Required Documents",
    guide_helpline: "Official Helpline",
    guide_call_now: "Call Now",
    guide_office_timing: "Office Timing",
    guide_website: "Official Website",
    guide_open_website: "Open Website",
    guide_processing_time: "Processing Time",
    guide_submission_checklist: "Submission Checklist",
    guide_escalation: "Escalation Path",
    guide_locate: "Locate Office",
    guide_open_maps: "Open in Google Maps",
    guide_unknown_policy: "Depends on department policy.",
`;

const newKeysUr = `
    guide_title: "سرکاری رہنمائی",
    guide_subtitle: "درخواست تیار ہونے کے بعد تمام ضروری رہنمائی۔",
    guide_submit_to: "دفتر جمع کرائیں",
    guide_reason: "وجہ",
    guide_req_docs: "ضروری دستاویزات",
    guide_helpline: "سرکاری ہیلپ لائن",
    guide_call_now: "ابھی کال کریں",
    guide_office_timing: "اوقاتِ کار",
    guide_website: "سرکاری ویب سائٹ",
    guide_open_website: "ویب سائٹ کھولیں",
    guide_processing_time: "متوقع وقت",
    guide_submission_checklist: "چیک لسٹ برائے جمع بندی",
    guide_escalation: "اگلا مرحلہ برائے شنوائی",
    guide_locate: "دفتر تلاش کریں",
    guide_open_maps: "گوگل میپس میں کھولیں",
    guide_unknown_policy: "محکمہ کی پالیسی پر منحصر ہے۔",
`;

const newKeysRoman = `
    guide_title: "Sarkari Rehnumai",
    guide_subtitle: "Application tayar hone ke baad tamam zaroori rehnumai.",
    guide_submit_to: "Daftar Jama Karayen",
    guide_reason: "Wajah",
    guide_req_docs: "Zaroori Dastawezat",
    guide_helpline: "Sarkari Helpline",
    guide_call_now: "Abhi Call Karein",
    guide_office_timing: "Auqat-e-Kaar",
    guide_website: "Sarkari Website",
    guide_open_website: "Website Kholein",
    guide_processing_time: "Mutawaqa Waqt",
    guide_submission_checklist: "Checklist Baraye Jama Bandi",
    guide_escalation: "Agla Marhala Baraye Sunwai",
    guide_locate: "Daftar Talash Karein",
    guide_open_maps: "Google Maps Mein Kholein",
    guide_unknown_policy: "Mehkamay ki policy par munhasir hai.",
`;

let code = fs.readFileSync('src/translations.ts', 'utf8');

code = code.replace(/settings_margin_stamp: "Stamp Paper Margin \\(Top 3 inches\\)",\n  },/g, 'settings_margin_stamp: "Stamp Paper Margin (Top 3 inches)",' + newKeysEn + '\n  },');

code = code.replace(/settings_margin_stamp: "اشٹام پیپر مارجن \\(اوپر 3 انچ\\)",\n  },/g, 'settings_margin_stamp: "اشٹام پیپر مارجن (اوپر 3 انچ)",' + newKeysUr + '\n  },');

code = code.replace(/settings_margin_stamp: "Stamp Paper Margin \\(Top 3 inches\\)",\n  }}/g, 'settings_margin_stamp: "Stamp Paper Margin (Top 3 inches)",' + newKeysRoman + '\n  }}');

fs.writeFileSync('src/translations.ts', code);
