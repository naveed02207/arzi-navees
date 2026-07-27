const fs = require('fs');

let code = fs.readFileSync('src/components/DraftPreview.tsx', 'utf8');

// Header
code = code.replace(/Official Draft Ready/, '{t("txt_doc_ready")}');

// Buttons
code = code.replace(/<span>Save Edits<\/span>/, '<span>{t("btn_save")}</span>');
code = code.replace(/<span>Edit Mode<\/span>/, '<span>{t("btn_edit")}</span>');
code = code.replace(/<span>Copied!<\/span>/, '<span>{t("txt_success")}</span>');
code = code.replace(/<span>Copy<\/span>/, '<span>{t("btn_copy")}</span>');
code = code.replace(/<span>TXT<\/span>/, '<span>{t("btn_txt")}</span>');
code = code.replace(/<span>\{isSaved \? "Saved" : "Save"\}<\/span>/, '<span>{isSaved ? t("txt_auto_saved") : t("btn_save")}</span>');
code = code.replace(/<span>Export PDF<\/span>/, '<span>{t("btn_export_pdf")}</span>');

// Replace the old print button and Export PDF button
const oldExportButton = `<button
            type="button"
            onClick={handlePrint}
            className={getTextClass(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all",
            )}
          >
            <FileDown className="w-4 h-4 text-emerald-100" />
            <span>{t("btn_export_pdf")}</span>
          </button>`;

const oldPrintButtonStr = /<button[\s\S]*?onClick=\{handlePrint\}[\s\S]*?<Printer className="w-4 h-4" \/> <span>Print<\/span>\s*<\/button>/m;

// Find the whole export button string
const exportRegex = /<button[\s\S]*?onClick=\{handlePrint\}[\s\S]*?<FileDown className="w-4 h-4 text-emerald-100" \/>[\s\S]*?<span>\{t\("btn_export_pdf"\)\}<\/span>\s*<\/button>/m;

code = code.replace(exportRegex, oldExportButton + `
          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className={getTextClass(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-gray-900 hover:bg-black text-white shadow-md transition-all print:hidden"
            )}
          >
            <Printer className="w-4 h-4 text-white" />
            <span>{t("btn_print")}</span>
          </button>`);
          
code = code.replace(oldPrintButtonStr, '');


// Document strings
code = code.replace(/"اسلامی جمہوریہ پاکستان — بمسودہ باضابطہ درخواست"\s*:\s*"OFFICIAL ADMINISTRATIVE APPLICATION — PAKISTAN"/, 'isUrdu ? t("doc_title") : t("doc_title")');
code = code.replace(/GOVERNMENT OF PAKISTAN • PUBLIC SERVICE & GRIEVANCE RELIEF CLERK/, '{t("doc_gov_pak")} • {t("doc_subtitle")}');

code = code.replace(/دستیاب بذریعہ: عریضہ نویس \(Arzi-Navees Editorial Drafting Suite\)/, '{t("txt_generated_in")} Arzi-Navees');
code = code.replace(/تاریخ تحریر:/, '{t("doc_date")}:');

code = code.replace(/Required Attachments & Action Checklist/, '{t("doc_action_checklist")}');
code = code.replace(/Do you have any questions about submitting this application\?/, '{t("doc_legal_notes")}');

code = code.replace(/>\s*Ask Question\s*<\/button>/g, '>{t("btn_ask_question")}</button>');
code = code.replace(/placeholder="e.g. What if the SHO refuses to accept the application\?"/, 'placeholder={t("btn_ask_question")}');

// Let's add t to the component
code = code.replace(/const \{ getTextClass \} = useLanguage\(\);/, 'const { t, getTextClass } = useLanguage();');

fs.writeFileSync('src/components/DraftPreview.tsx', code);
