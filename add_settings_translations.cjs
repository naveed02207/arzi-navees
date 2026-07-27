const fs = require('fs');

let content = fs.readFileSync('src/translations.ts', 'utf8');

const englishKeys = `    settings_font_standard: "Standard (14pt)",
    settings_font_large: "Large (16pt)",
    settings_margin_standard: "Standard (1 inch)",
    settings_margin_stamp: "Stamp Paper Margin (Top 3 inches)",`;

const urduKeys = `    settings_font_standard: "معیاری (14pt)",
    settings_font_large: "بڑا (16pt)",
    settings_margin_standard: "معیاری (1 انچ)",
    settings_margin_stamp: "اشٹام پیپر مارجن (اوپر 3 انچ)",`;

const romanKeys = `    settings_font_standard: "Standard (14pt)",
    settings_font_large: "Large (16pt)",
    settings_margin_standard: "Standard (1 inch)",
    settings_margin_stamp: "Stamp Paper Margin (Top 3 inches)",`;

content = content.replace(/    settings_margin_desc: "Sarkari kaghaz ke liye margins adjust karein."/, '    settings_margin_desc: "Sarkari kaghaz ke liye margins adjust karein.",\n' + romanKeys);
content = content.replace(/    settings_margin_desc: "سرکاری قانونی کاغذ کے لیے حاشیے ایڈجسٹ کریں۔"/, '    settings_margin_desc: "سرکاری قانونی کاغذ کے لیے حاشیے ایڈجسٹ کریں۔",\n' + urduKeys);
content = content.replace(/    settings_margin_desc: "Adjust margins for official legal paper."/, '    settings_margin_desc: "Adjust margins for official legal paper.",\n' + englishKeys);

fs.writeFileSync('src/translations.ts', content);

let settingsCode = fs.readFileSync('src/components/SettingsView.tsx', 'utf8');

settingsCode = settingsCode.replace(/<option value="standard">Standard \(14pt\)<\/option>/, '<option value="standard">{t("settings_font_standard") as string}</option>');
settingsCode = settingsCode.replace(/<option value="large">Large \(16pt\)<\/option>/, '<option value="large">{t("settings_font_large") as string}</option>');
settingsCode = settingsCode.replace(/<option value="standard">Standard \(1 inch\)<\/option>/, '<option value="standard">{t("settings_margin_standard") as string}</option>');
settingsCode = settingsCode.replace(/<option value="stamp">Stamp Paper Margin \(Top 3 inches\)<\/option>/, '<option value="stamp">{t("settings_margin_stamp") as string}</option>');

fs.writeFileSync('src/components/SettingsView.tsx', settingsCode);
