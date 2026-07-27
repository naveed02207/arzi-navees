const fs = require('fs');
let code = fs.readFileSync('src/components/ComplaintInput.tsx', 'utf8');
code = code.replace(
  /export const ComplaintInput: React\.FC<ComplaintInputProps> = \(\{/,
  'export const ComplaintInput: React.FC<ComplaintInputProps> = React.memo(({'
);
code = code.replace(
  /    <\/div>\n  \);\n};\n$/,
  '    </div>\n  );\n});\n'
);
fs.writeFileSync('src/components/ComplaintInput.tsx', code);
