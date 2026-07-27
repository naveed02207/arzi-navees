const fs = require('fs');
let code = fs.readFileSync('src/components/DepartmentSelector.tsx', 'utf8');
code = code.replace(/          \);\n};\n        \}\)\{" "\}/, '          );\n        })}{" "}');
fs.writeFileSync('src/components/DepartmentSelector.tsx', code);
