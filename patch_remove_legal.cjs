const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove import
code = code.replace(/const LegalAdviceModal = lazy\(\(\) => import\("\.\/components\/LegalAdviceModal"\)\.then\(m => \(\{ default: m\.LegalAdviceModal \}\)\)\);\n/g, '');

// Remove state
code = code.replace(/const \[legalAdviceModal, setLegalAdviceModal\] = useState.*?;\n/s, '');

// Remove handler
code = code.replace(/const handleAskLegalQuestion = async.*?\}\n  \};\n/s, '');

// Remove JSX
code = code.replace(/<Suspense fallback=\{<div \/>\}>\s*<LegalAdviceModal.*?<\/Suspense>/s, '');

fs.writeFileSync('src/App.tsx', code);
