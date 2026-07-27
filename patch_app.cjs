const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/title="Reset Form"/g, 'title={t("btn_reset")}');
code = code.replace(/<span>Reset Form<\/span>/g, '<span>{t("btn_reset")}</span>');
code = code.replace(/>Loading...<\/div>/g, '>{t("txt_loading")}</div>');
code = code.replace(/Failed to generate draft/g, 'Failed to generate draft'); // I shouldn't change error message that user doesn't see directly or wait, this is an error so txt_error

fs.writeFileSync('src/App.tsx', code);
