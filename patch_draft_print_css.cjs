const fs = require('fs');

let code = fs.readFileSync('src/components/DraftPreview.tsx', 'utf8');

code = code.replace(/print:absolute print:top-0 print:left-0 /g, '');

fs.writeFileSync('src/components/DraftPreview.tsx', code);
