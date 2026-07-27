const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Update the prompt to only generate applicationText
code = code.replace(
/Generate a response as JSON with two fields:.*?1\. "applicationText":.*?2\. "legalNotes":.*?where to submit\)\.`/s,
`Generate a response as JSON with one field:
1. "applicationText": The complete, pristine, formal administrative application string formatted strictly according to the system rules above.\``
);

code = code.replace(
/legalNotes: \{\s*type: Type.STRING,\s*description: "Guidance on laws, required attachments, and submission steps in Pakistan."\s*\}/s,
''
);

code = code.replace(
/let parsedResult = \{ applicationText: "", legalNotes: "" \};\s*try \{\s*parsedResult = JSON\.parse\(resultText\);\s*\} catch \{\s*parsedResult = \{\s*applicationText: resultText,\s*legalNotes: "Please ensure all relevant supporting documents \(CNIC copy, receipts, proof\) are attached when submitting to the concerned department\."\s*\};\s*\}/s,
`let parsedResult = { applicationText: "" };
    try {
      parsedResult = JSON.parse(resultText);
    } catch {
      parsedResult = {
        applicationText: resultText
      };
    }`
);

code = code.replace(
/applicationText: parsedResult\.applicationText,\s*legalNotes: parsedResult\.legalNotes \|\| ""/s,
`applicationText: parsedResult.applicationText`
);

fs.writeFileSync('server.ts', code);
