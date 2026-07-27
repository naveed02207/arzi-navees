const fs = require('fs');

let content = fs.readFileSync('src/translations.ts', 'utf8');

content = content.replace(/    txt_drafting: "Drafting...",/g, '    txt_drafting: "Drafting...",\n    txt_official_suite: "Official Suite",');
content = content.replace(/    txt_drafting: "مسودہ تیار ہو رہا ہے...",/g, '    txt_drafting: "مسودہ تیار ہو رہا ہے...",\n    txt_official_suite: "آفیشل سویٹ",');

fs.writeFileSync('src/translations.ts', content);

let code = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');
code = code.replace(/Official Suite/, '{t("txt_official_suite")}');
fs.writeFileSync('src/components/Sidebar.tsx', code);
