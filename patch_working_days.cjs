const fs = require('fs');

const newKeysEn = 'guide_working_days: "Working Days",';
const newKeysUr = 'guide_working_days: "ورکنگ دن",';
const newKeysRoman = 'guide_working_days: "Working Days",';

let code = fs.readFileSync('src/translations.ts', 'utf8');
code = code.replace(/guide_gen_timing: "9:00 AM - 5:00 PM",\n/g, 'guide_gen_timing: "9:00 AM - 5:00 PM",\n    ' + newKeysEn + '\n');
code = code.replace(/guide_gen_timing: "9:00 AM - 5:00 PM",\n/g, 'guide_gen_timing: "9:00 AM - 5:00 PM",\n    ' + newKeysUr + '\n');
code = code.replace(/guide_gen_timing: "9:00 AM - 5:00 PM",\n/g, 'guide_gen_timing: "9:00 AM - 5:00 PM",\n    ' + newKeysRoman + '\n');

// The replace logic above is flawed because it matches all three occurrences and replaces them with English, then the remaining ones? Wait, the regex `guide_gen_timing: "9:00 AM - 5:00 PM",\n` is the exact same string across all three!
