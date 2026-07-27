const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/import \{ SubmissionGuide \} from "\.\/components\/SubmissionGuide";\n/g, '');
code = code.replace(/<SubmissionGuide draftResponse=\{draftResponse\} \/>\{" "\}\n/g, '');
// just in case it doesn't have {" "}
code = code.replace(/<SubmissionGuide draftResponse=\{draftResponse\} \/>/g, '');

fs.writeFileSync('src/App.tsx', code);
