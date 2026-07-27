const fs = require('fs');
let code = fs.readFileSync('src/components/DepartmentSelector.tsx', 'utf8');

code = code.replace(/\{t\("lbl_department_desc"\)\}\s+application\s+<\/p>/, '{t("lbl_department_desc")}</p>');

fs.writeFileSync('src/components/DepartmentSelector.tsx', code);
