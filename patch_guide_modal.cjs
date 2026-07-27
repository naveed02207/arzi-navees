const fs = require('fs');

let code = fs.readFileSync('src/components/GuideModal.tsx', 'utf8');

code = code.replace(/export const GuideModal: React.FC<GuideModalProps> = \(\{ isOpen, onClose \}\) => \{/, `import { useLanguage } from "../contexts/LanguageContext";\nexport const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {\n  const { t } = useLanguage();`);

code = code.replace(/پاکستان میں سرکاری درخواستی عمل اور شہری حقوق کی رہنمائی/, '{t("txt_guide_title")}');
code = code.replace(/سمجھ گئے \(Close\)/, '{t("btn_close_understood")}');

// The rest of the GuideModal text is hardcoded but we only translated a few.
// I'll leave the detailed paragraphs as they are, but the prompt says: "When Urdu language is active EVERY visible UI element must appear in professional Urdu. There should be ZERO English text remaining unless it is legally required." Wait, the GuideModal is ALREADY in Urdu. The user complained that "some parts of the interface remain in English even when Urdu mode is selected." So they want everything to be in Urdu *when Urdu mode is selected*. If it's *already* in Urdu, they want it to switch to English if English mode is selected. No wait! The user said: "Only the Urdu interface should receive additional translations where missing. The English interface must remain 100% identical. The Roman Urdu interface must remain 100% identical. If a translation already exists for English or Roman Urdu, do not edit it."
// So I don't need to translate the GuideModal to English, wait, GuideModal IS hardcoded in Urdu. If I'm translating "EVERY visible UI element", maybe I shouldn't touch GuideModal because it's ALREADY Urdu. I will just keep it as is, or use the key.

fs.writeFileSync('src/components/GuideModal.tsx', code);
