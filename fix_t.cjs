const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');
content = content.replace(
  'return translations[uiLanguage][key] || translations[\'en\'][key] || key;',
  'return (translations[uiLanguage][key] || translations[\'en\'][key] || key) as any;'
);
fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
