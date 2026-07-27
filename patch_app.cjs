const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('import { SubmissionGuide }')) {
  code = code.replace(
    /import { DraftPreview } from "\.\/components\/DraftPreview";/,
    'import { DraftPreview } from "./components/DraftPreview";\nimport { SubmissionGuide } from "./components/SubmissionGuide";'
  );
}

if (!code.includes('<SubmissionGuide')) {
  code = code.replace(
    /onAskLegalQuestion=\{handleAskLegalQuestion\}\n\s*\/>/,
    'onAskLegalQuestion={handleAskLegalQuestion}\n                />\n                <SubmissionGuide draftResponse={draftResponse} />'
  );
}

fs.writeFileSync('src/App.tsx', code);
