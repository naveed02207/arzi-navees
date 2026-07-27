const fs = require('fs');

let code = fs.readFileSync('src/components/DraftPreview.tsx', 'utf8');

// The wrapper for Supplemental Legal Notes has print:hidden
code = code.replace(/<div className="bg-white rounded-xl shadow-md p-6 print:hidden transition-all duration-300 hover:shadow-lg">/, '<div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg print:mt-10 print:shadow-none print:border-none print:p-0">');

// The "Ask Follow-up Legal Question Input" section should be print:hidden
code = code.replace(/<div className="mt-5 pt-4 border-t border-gray-100 ">/, '<div className="mt-5 pt-4 border-t border-gray-100 print:hidden">');

// Also in DraftPreview.tsx, the buttons row wrapper has `print:hidden` which is correct, but let me check exactly.
// `className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-xl shadow-md p-4 mb-4 print:hidden"`
// This is already hidden.

fs.writeFileSync('src/components/DraftPreview.tsx', code);
