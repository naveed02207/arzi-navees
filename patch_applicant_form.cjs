const fs = require('fs');
let code = fs.readFileSync('src/components/ApplicantForm.tsx', 'utf8');
code = code.replace(
  /export const ApplicantForm: React\.FC<ApplicantFormProps> = \(\{/,
  'export const ApplicantForm: React.FC<ApplicantFormProps> = React.memo(({'
);
code = code.replace(
  /    <\/div>\n  \);\n};\n$/,
  '    </div>\n  );\n});\n'
);
fs.writeFileSync('src/components/ApplicantForm.tsx', code);
