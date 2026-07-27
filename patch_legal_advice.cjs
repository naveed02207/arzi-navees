const fs = require('fs');

let code = fs.readFileSync('src/components/LegalAdviceModal.tsx', 'utf8');

code = code.replace(/export const LegalAdviceModal: React.FC<LegalAdviceModalProps> = \(\{/, `import { useLanguage } from "../contexts/LanguageContext";\nexport const LegalAdviceModal: React.FC<LegalAdviceModalProps> = ({`);
code = code.replace(/if \(!isOpen\) return null;/, `const { t } = useLanguage();\n  if (!isOpen) return null;`);

code = code.replace(/قانونی و انتظامی مشورہ \(Legal Advisory\)/, '{t("txt_legal_advisory")}');
code = code.replace(/<span className="font-bold text-\[\#8B735B\]">سوال: <\/span>/, '<span className="font-bold text-[#8B735B]">{t("txt_question_label")}</span>');
code = code.replace(/<span>قانونی مشورہ تیار کیا جا رہا ہے...<\/span>/, '<span>{t("txt_legal_loading")}</span>');
code = code.replace(/بند کریں \(Close\)/, '{t("btn_close")}');

fs.writeFileSync('src/components/LegalAdviceModal.tsx', code);
