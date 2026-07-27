const fs = require('fs');

let code = fs.readFileSync('src/components/HistoryDrawer.tsx', 'utf8');

// Need to inject useLanguage
code = code.replace(/export const HistoryDrawer: React.FC<HistoryDrawerProps> = \(\{/, `import { useLanguage } from "../contexts/LanguageContext";\nexport const HistoryDrawer: React.FC<HistoryDrawerProps> = ({`);
code = code.replace(/if \(!isOpen\) return null;/, `const { t } = useLanguage();\n  if (!isOpen) return null;`);

code = code.replace(/محفوظ شدہ درخواستیں/, '{t("txt_saved_drafts")}');
code = code.replace(/ابھی تک کوئی درخواست محفوظ نہیں کی گئی۔/, '{t("txt_no_saved_drafts")}');
code = code.replace(/<span>دوبارہ کھولیں<\/span>/, '<span>{t("txt_reopen")}</span>');
code = code.replace(/title="حذف کریں"/, 'title={t("txt_delete")}');
code = code.replace(/<span>تمام ریکارڈ صاف کریں<\/span>/, '<span>{t("txt_clear_all")}</span>');

fs.writeFileSync('src/components/HistoryDrawer.tsx', code);
