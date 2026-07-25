const fs = require('fs');
const content = fs.readFileSync('src/translations.ts', 'utf8');
console.log(content.substring(0, 1000));
