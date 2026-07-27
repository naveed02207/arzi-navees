const fs = require('fs');

let code = fs.readFileSync('src/components/ComplaintInput.tsx', 'utf8');

code = code.replace(/Describe your issue here freely in any language/, '{t("txt_describe_issue")}');
code = code.replace(/زبان خاکہ:/, '{t("txt_output_lang_label")}');
code = code.replace(/ریکارڈنگ جاری.../, '{t("txt_recording")}');
code = code.replace(/بول کر لکھیں \(Urdu Dictation\)/, '{t("txt_dictate")}');
code = code.replace(/title="متن صاف کریں"/, 'title={t("btn_clear_text")}');
code = code.replace(/حروف کی تعداد:/, '{t("txt_char_count")}');
code = code.replace(/<span>Drafting...<\/span>/, '<span>{t("txt_drafting")}</span>');

fs.writeFileSync('src/components/ComplaintInput.tsx', code);
