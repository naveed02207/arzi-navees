const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<TemplatesView([^>]*)\/>/g,
  '<Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}><TemplatesView$1/></Suspense>'
);

code = code.replace(
  /<SettingsView([^>]*)\/>/g,
  '<Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}><SettingsView$1/></Suspense>'
);

code = code.replace(
  /\{(\/\* Modals & Drawers \*\/)\}\{" "\}/,
  '{$1}{" "}<Suspense fallback={null}>'
);

code = code.replace(
  /<LegalAdviceModal([\s\S]*?)\/>\{" "\}\n    <\/div>\n  \);\n}/,
  '<LegalAdviceModal$1/>{" "}</Suspense>\n    </div>\n  );\n}'
);

fs.writeFileSync('src/App.tsx', code);
