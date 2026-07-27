const fs = require('fs');
let code = fs.readFileSync('src/translations.ts', 'utf8');

code = code.replace(/Stamp Paper Margin \(Top 3 inches\)",,/g, 'Stamp Paper Margin (Top 3 inches)",');
code = code.replace(/اشٹام پیپر مارجن \(اوپر 3 انچ\)",,/g, 'اشٹام پیپر مارجن (اوپر 3 انچ)",');

fs.writeFileSync('src/translations.ts', code);
