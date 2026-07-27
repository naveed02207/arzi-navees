const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the syntax error around line 51
code = code.replace(/setLegalAdviceModal\(\{[\s\S]*?>\(\{ isOpen: false, question: "", answer: "", isLoading: false \}\);/g, '');

// Also remove LegalAdviceModal from JSX
code = code.replace(/<LegalAdviceModal[\s\S]*?\/>/g, '');

fs.writeFileSync('src/App.tsx', code);
