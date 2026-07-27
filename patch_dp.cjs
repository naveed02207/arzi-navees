const fs = require('fs');

const lines = fs.readFileSync('src/components/DraftPreview.tsx', 'utf8').split('\n');
const startIdx = lines.findIndex(line => line.includes('{draftResponse.legalNotes && ('));

if (startIdx !== -1) {
  // Find the closing brace of the JSX block. We know it ends near the end of the file.
  // Actually, we can just slice it out and put the closing tags.
  const before = lines.slice(0, startIdx).join('\n');
  const after = '    </div>\n  );\n});\n';
  fs.writeFileSync('src/components/DraftPreview.tsx', before + '\n' + after);
}

