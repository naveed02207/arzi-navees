const fs = require('fs');
let code = fs.readFileSync('src/translations.ts', 'utf8');

const enSettings = `
    settings_title: "Application Settings",
    settings_desc: "Manage your auto-fill profile, preferences, and document export settings.",
    settings_autofill_title: "My Details (Auto-Fill)",
    settings_fullname: "Full Name",
    settings_mobile: "Mobile Number",
    settings_city: "City/District",
    settings_save_btn: "Save Details",
    settings_save_success: "Saved successfully!",
    settings_prefs_title: "Application Preferences",
    settings_lang_label: "Default Output Language",
    settings_lang_desc: "Choose the language for the final generated document.",
    settings_export_title: "Document Export Settings",
    settings_font_label: "Print Font Size",
    settings_font_desc: "Larger sizes improve Nastaleeq readability.",
    settings_margin_label: "Document Margins",
    settings_margin_desc: "Adjust margins for official legal paper.",
`;

code = code.replace(/preview_title: "04. OFFICIAL DRAFT PREVIEW"(\s*)\}/, 'preview_title: "04. OFFICIAL DRAFT PREVIEW",\n' + enSettings + '\n  }');

fs.writeFileSync('src/translations.ts', code);
console.log("Translations en updated");
