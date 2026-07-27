const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');
code = code.replace(/legalNotes\?: string;/g, '');
fs.writeFileSync('src/types.ts', code);
