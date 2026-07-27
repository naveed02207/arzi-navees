const fs = require('fs');

const buttonsCode = `
          {/* Edit Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                // save edits logic (which was already in the component, wait, DraftPreview handles it by just toggling isEditing)
                setIsEditing(false);
              } else {
                setIsEditing(true);
              }
            }}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 text-gray-700 border border-gray-200 transition-colors"
            )}
          >
            {isEditing ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t("btn_save")}</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 text-emerald-600" />
                <span>{t("btn_edit")}</span>
              </>
            )}
          </button>
          
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 text-gray-700 border border-gray-200 transition-colors"
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t("txt_success")}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-emerald-600" />
                <span>{t("btn_copy")}</span>
              </>
            )}
          </button>
          
          {/* TXT Button */}
          <button
            type="button"
            onClick={handleDownloadTxt}
            className={getTextClass(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 text-gray-700 border border-gray-200 transition-colors"
            )}
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>{t("btn_txt")}</span>
          </button>
          
          {/* Save to History Button */}
          <button
            type="button"
            onClick={() => onSaveToHistory(draftResponse)}
            className={\`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors \${getTextClass("")} \${isSaved ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 text-gray-700 border-gray-200"}\`}
          >
            <Bookmark className={\`w-4 h-4 \${isSaved ? "fill-emerald-600 text-emerald-600" : "text-emerald-600"}\`} />
            <span>{isSaved ? t("txt_auto_saved") : t("btn_save")}</span>
          </button>
          
          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            className={getTextClass(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
            )}
          >
            <FileDown className="w-4 h-4 text-emerald-100" />
            <span>{t("btn_export_pdf")}</span>
          </button>
          
          {/* Print Application Button */}
          <button
            type="button"
            onClick={handlePrint}
            className={getTextClass(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-gray-900 hover:bg-black text-white shadow-md transition-all print:hidden"
            )}
          >
            <Printer className="w-4 h-4 text-white" />
            <span>{t("btn_print")}</span>
          </button>
`;

let code = fs.readFileSync('src/components/DraftPreview.tsx', 'utf8');
code = code.replace(/<div className="flex flex-wrap items-center gap-2 sm:gap-3">\s*<\/div>/, '<div className="flex flex-wrap items-center gap-2 sm:gap-3">\n' + buttonsCode + '\n</div>');
fs.writeFileSync('src/components/DraftPreview.tsx', code);
