const fs = require('fs');

let code = fs.readFileSync('src/components/DraftPreview.tsx', 'utf8');

code = code.replace(/onAskLegalQuestion: \(question: string\) => void;\n/g, '');
code = code.replace(/onAskLegalQuestion,\n/g, '');

fs.writeFileSync('src/components/DraftPreview.tsx', code);

