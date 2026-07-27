const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/<span className="font-bold">Error:<\/span>/, '<span className="font-bold">{t("txt_error")}:</span>');

fs.writeFileSync('src/App.tsx', code);
