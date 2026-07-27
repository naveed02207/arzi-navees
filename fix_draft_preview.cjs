const fs = require('fs');
let code = fs.readFileSync('src/components/DraftPreview.tsx', 'utf8');

code = code.replace(/isUrdu\s*\?\s*isUrdu \? t\("doc_title"\) : t\("doc_title"\)\}/, 't("doc_title")}');

fs.writeFileSync('src/components/DraftPreview.tsx', code);
