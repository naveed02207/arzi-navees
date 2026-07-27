const fs = require('fs');

function updateA11y(file) {
  let content = fs.readFileSync(file, 'utf8');

  // add outline-none focus-visible:ring to buttons
  content = content.replace(/hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2/g,
    'hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2');

  // other buttons without it
  content = content.replace(/transition-all duration-300 hover:-translate-y-0.5"/g,
    'transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"');

  // input focus
  content = content.replace(/focus:ring-2 focus:ring-emerald-500\/20 outline-none transition-all duration-200/g,
    'focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-200');
    
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
  'src/components/TemplatesView.tsx',
  'src/components/Sidebar.tsx',
  'src/components/Header.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    updateA11y(f);
  }
});
