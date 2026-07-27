const fs = require('fs');

const newKeysEn = `
    guide_dept_name: "Department Name",
    guide_resp_office: "Responsible Office",
    guide_find_nearest: "Find the nearest",
    guide_on_maps: "on Google Maps.",
`;

const newKeysUr = `
    guide_dept_name: "محکمہ کا نام",
    guide_resp_office: "متعلقہ دفتر",
    guide_find_nearest: "قریبی",
    guide_on_maps: "گوگل میپس پر تلاش کریں۔",
`;

const newKeysRoman = `
    guide_dept_name: "Mehkamay Ka Naam",
    guide_resp_office: "Mutaliqa Daftar",
    guide_find_nearest: "Qareebi",
    guide_on_maps: "Google Maps par talash karein.",
`;

let code = fs.readFileSync('src/translations.ts', 'utf8');

code = code.replace(/guide_chk_followup: "Follow up after 7 days",\n/g, 'guide_chk_followup: "Follow up after 7 days",\n' + newKeysEn);
code = code.replace(/guide_chk_followup: "7 دن بعد رابطہ کریں",\n/g, 'guide_chk_followup: "7 دن بعد رابطہ کریں",\n' + newKeysUr);
code = code.replace(/guide_chk_followup: "7 Din Baad Rabta Karein",\n/g, 'guide_chk_followup: "7 Din Baad Rabta Karein",\n' + newKeysRoman);

fs.writeFileSync('src/translations.ts', code);

let comp = fs.readFileSync('src/components/SubmissionGuide.tsx', 'utf8');
comp = comp.replace(/>\s*Department Name\s*<\/p>/g, '>{t("guide_dept_name")}</p>');
comp = comp.replace(/>\s*Responsible Office\s*<\/p>/g, '>{t("guide_resp_office")}</p>');
comp = comp.replace(/Find the nearest \{guide.searchQuery\} on Google Maps./g, '{t("guide_find_nearest")} {guide.searchQuery} {t("guide_on_maps")}');

fs.writeFileSync('src/components/SubmissionGuide.tsx', comp);
