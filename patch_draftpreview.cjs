const fs = require('fs');
let code = fs.readFileSync('src/components/DraftPreview.tsx', 'utf8');

// The header has items-center, let's make it better:
code = code.replace(/flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6/g, 
  'flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-6');

// The Document Header
code = code.replace(/text-center mb-6 border-b-2 border-double border-gray-800 pb-4/g,
  'text-center mb-8 border-b-2 border-gray-900 pb-6');

// The Status Badge (if any)
code = code.replace(/bg-emerald-50 text-emerald-700/g, 'bg-emerald-100 text-emerald-800');

fs.writeFileSync('src/components/DraftPreview.tsx', code);
