const fs = require('fs');

const newKeysEn = `
    guide_chk_print: "Print Application",
    guide_chk_sign: "Sign Application",
    guide_chk_attach_cnic: "Attach CNIC",
    guide_chk_attach_docs: "Attach Documents",
    guide_chk_submit: "Submit at Office",
    guide_chk_receipt: "Obtain Receiving Copy",
    guide_chk_diary: "Save Diary Number",
    guide_chk_followup: "Follow up after 7 days",
`;

const newKeysUr = `
    guide_chk_print: "درخواست پرنٹ کریں",
    guide_chk_sign: "دستخط کریں",
    guide_chk_attach_cnic: "شناختی کارڈ منسلک کریں",
    guide_chk_attach_docs: "دستاویزات منسلک کریں",
    guide_chk_submit: "دفتر میں جمع کرائیں",
    guide_chk_receipt: "وصولی کی رسید حاصل کریں",
    guide_chk_diary: "ڈائری نمبر محفوظ کریں",
    guide_chk_followup: "7 دن بعد رابطہ کریں",
`;

const newKeysRoman = `
    guide_chk_print: "Application Print Karein",
    guide_chk_sign: "Sign Karein",
    guide_chk_attach_cnic: "CNIC Attach Karein",
    guide_chk_attach_docs: "Documents Attach Karein",
    guide_chk_submit: "Office mein Jama Karayen",
    guide_chk_receipt: "Receiving Copy Hasil Karein",
    guide_chk_diary: "Diary Number Save Karein",
    guide_chk_followup: "7 Din Baad Rabta Karein",
`;

let code = fs.readFileSync('src/translations.ts', 'utf8');

code = code.replace(/guide_unknown_policy: "Depends on department policy.",\n/g, 'guide_unknown_policy: "Depends on department policy.",\n' + newKeysEn);
code = code.replace(/guide_unknown_policy: "محکمہ کی پالیسی پر منحصر ہے۔",\n/g, 'guide_unknown_policy: "محکمہ کی پالیسی پر منحصر ہے۔",\n' + newKeysUr);
code = code.replace(/guide_unknown_policy: "Mehkamay ki policy par munhasir hai.",\n/g, 'guide_unknown_policy: "Mehkamay ki policy par munhasir hai.",\n' + newKeysRoman);

fs.writeFileSync('src/translations.ts', code);
