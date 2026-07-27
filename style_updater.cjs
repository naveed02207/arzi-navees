const fs = require('fs');

function updateStyles(file) {
  let content = fs.readFileSync(file, 'utf8');

  // App.tsx
  content = content.replace(/rounded-xl shadow-md p-4 sm:p-6 lg:p-8 relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl/g, 
    'rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-md');
  
  content = content.replace(/rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg hover:shadow-emerald-500\/50 hover:-translate-y-1 transition-all duration-300/g,
    'rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-lg px-8 py-3.5 shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2');
  
  content = content.replace(/rounded-lg bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-0\.5 hover:shadow-md uppercase tracking-wider/g,
    'rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium border border-gray-200 px-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-200 uppercase tracking-wider');

  // Input fields
  content = content.replace(/w-full bg-transparent border-b border-gray-300 focus:border-emerald-500 py-1\.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none transition-colors/g,
    'w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500\/20 outline-none transition-all duration-200');

  // Settings fields
  content = content.replace(/w-full bg-gray-50 border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-lg px-3 py-2 text-sm transition-colors/g,
    'w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm transition-colors focus:ring-2 focus:ring-emerald-500\/20');

  // Other cards
  content = content.replace(/bg-white rounded-xl shadow-sm border border-emerald-100 p-5/g, 
    'bg-white rounded-2xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-md');
  content = content.replace(/bg-gray-50 rounded-xl p-5/g, 
    'bg-gray-50 rounded-2xl p-6 border border-gray-200');
    
  // Applicant form header
  content = content.replace(/bg-white rounded-xl shadow-sm border border-emerald-100 p-4 sm:p-5/g,
    'bg-white rounded-2xl border border-gray-200 shadow-sm p-6');

  // Complaint box
  content = content.replace(/w-full bg-emerald-50\/30 border-2 border-emerald-100 focus:border-emerald-500 rounded-xl p-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none transition-colors resize-none leading-relaxed text-sm sm:text-base min-h-\[160px\]/g,
    'w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 rounded-2xl p-5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500\/20 outline-none transition-all duration-200 resize-none leading-relaxed text-sm sm:text-base min-h-\[160px\]');

  // Select dropdowns
  content = content.replace(/w-full bg-white border-2 border-emerald-100 focus:border-emerald-500 rounded-xl px-4 py-2.5/g,
    'w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 rounded-xl px-4 py-2.5');

  // Secondary buttons
  content = content.replace(/px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-emerald-700 font-bold text-base sm:text-lg border-2 border-emerald-100 shadow-sm transition-colors/g,
    'px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-medium text-base sm:text-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200');

  // Primary submit buttons
  content = content.replace(/flex-1 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg hover:-translate-y-0\.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0/g,
    'flex-1 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base sm:text-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-70 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2');

  // Dept cards
  content = content.replace(/cursor-pointer rounded-xl border-2 transition-all duration-300 p-4/g,
    'cursor-pointer rounded-2xl border transition-all duration-300 p-5');

  fs.writeFileSync(file, content);
}

const files = [
  'src/App.tsx',
  'src/components/ApplicantForm.tsx',
  'src/components/ComplaintInput.tsx',
  'src/components/DepartmentSelector.tsx',
  'src/components/DraftPreview.tsx',
  'src/components/GuideModal.tsx',
  'src/components/HistoryDrawer.tsx',
  'src/components/SettingsView.tsx',
  'src/components/TemplatesView.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    updateStyles(f);
  }
});
