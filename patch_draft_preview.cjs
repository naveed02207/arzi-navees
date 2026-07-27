const fs = require('fs');
let code = fs.readFileSync('src/components/DraftPreview.tsx', 'utf8');
code = code.replace(
  /export const DraftPreview: React\.FC<DraftPreviewProps> = \(\{/,
  'export const DraftPreview: React.FC<DraftPreviewProps> = React.memo(({'
);
code = code.replace(
  /    <\/div>\n  \);\n};\n$/,
  '    </div>\n  );\n});\n'
);
fs.writeFileSync('src/components/DraftPreview.tsx', code);
