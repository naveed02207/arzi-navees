const fs = require('fs');

let code = fs.readFileSync('src/components/ApplicantForm.tsx', 'utf8');

code = code.replace(/Auto-Saved/g, '{t("txt_auto_saved")}');
code = code.replace(/Your details are saved locally for future use/g, '{t("txt_saved_locally")}');
code = code.replace(/Auto-fill/g, '{t("btn_auto_fill")}');
code = code.replace(/Father\/Husband Name/g, '{t("placeholder_father_name")}');

fs.writeFileSync('src/components/ApplicantForm.tsx', code);
