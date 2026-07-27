const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/legalNotes: data\.legalNotes \|\| "",\n/g, '');
code = code.replace(/onAskLegalQuestion=\{handleAskLegalQuestion\}/g, '');

fs.writeFileSync('src/App.tsx', code);

