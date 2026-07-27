const fs = require('fs');

let content = fs.readFileSync('src/translations.ts', 'utf8');

const englishKeys = `    btn_generate: "Generate Official Application",
    txt_saved_drafts: "Saved Drafts",
    txt_no_saved_drafts: "No drafts saved yet.",
    txt_reopen: "Re-open",
    txt_delete: "Delete",
    txt_clear_all: "Clear All Records",
    txt_legal_advisory: "Legal & Administrative Advisory",
    txt_question_label: "Question: ",
    txt_legal_loading: "Preparing legal advice...",
    btn_close: "Close",
    txt_guide_title: "Pakistan Public Service Guide",
    btn_close_understood: "Understood (Close)",
    txt_saved_locally: "Your details are saved locally for future use",
    btn_auto_fill: "Auto-fill",
    placeholder_father_name: "Father/Husband Name",
    txt_describe_issue: "Describe your issue here freely in any language",
    txt_output_lang_label: "Output Language:",
    txt_recording: "Recording...",
    txt_dictate: "Dictate in Urdu",
    btn_clear_text: "Clear text",
    txt_char_count: "Character count: ",
    txt_drafting: "Drafting...",`;

const urduKeys = `    btn_generate: "باضابطہ قانونی درخواست تیار کریں",
    txt_saved_drafts: "محفوظ شدہ درخواستیں",
    txt_no_saved_drafts: "ابھی تک کوئی درخواست محفوظ نہیں کی گئی۔",
    txt_reopen: "دوبارہ کھولیں",
    txt_delete: "حذف کریں",
    txt_clear_all: "تمام ریکارڈ صاف کریں",
    txt_legal_advisory: "قانونی و انتظامی مشورہ (Legal Advisory)",
    txt_question_label: "سوال: ",
    txt_legal_loading: "قانونی مشورہ تیار کیا جا رہا ہے...",
    btn_close: "بند کریں (Close)",
    txt_guide_title: "پاکستان میں سرکاری درخواستی عمل اور شہری حقوق کی رہنمائی",
    btn_close_understood: "سمجھ گئے (Close)",
    txt_saved_locally: "آپ کی تفصیلات مستقبل کے استعمال کے لیے محفوظ کی گئی ہیں",
    btn_auto_fill: "خود پُر کریں",
    placeholder_father_name: "والد/شوہر کا نام",
    txt_describe_issue: "اپنا مسئلہ یہاں کسی بھی زبان میں بلا جھجھک بیان کریں",
    txt_output_lang_label: "زبان خاکہ:",
    txt_recording: "ریکارڈنگ جاری...",
    txt_dictate: "بول کر لکھیں (Urdu Dictation)",
    btn_clear_text: "متن صاف کریں",
    txt_char_count: "حروف کی تعداد: ",
    txt_drafting: "مسودہ تیار ہو رہا ہے...",`;

const romanKeys = `    btn_generate: "Ba-Zabta Qanooni Darkhwast Tayyar Karein",
    txt_saved_drafts: "Mehfooz Shuda Darkhwastain",
    txt_no_saved_drafts: "Koi darkhwast save nahi hui abhi tak.",
    txt_reopen: "Dobara Kholein",
    txt_delete: "Delete Karein",
    txt_clear_all: "Tamam Record Saaf Karein",
    txt_legal_advisory: "Qanooni aur Intizami Mashwara",
    txt_question_label: "Sawal: ",
    txt_legal_loading: "Qanooni mashwara tayyar kiya ja raha hai...",
    btn_close: "Band Karein",
    txt_guide_title: "Pakistan mein sarkaari darkhwasti amal aur shehri haqooq ki rehnumai",
    btn_close_understood: "Samajh gaye",
    txt_saved_locally: "Aap ki tafseelat future ke liye save hain",
    btn_auto_fill: "Auto-fill Karein",
    placeholder_father_name: "Walid/Shohar ka Naam",
    txt_describe_issue: "Apna masla kisi bhi zaban mein tafseel se bayan karein",
    txt_output_lang_label: "Zaban Khaka:",
    txt_recording: "Recording...",
    txt_dictate: "Urdu mein Dictation karein",
    btn_clear_text: "Text saaf karein",
    txt_char_count: "Haroof ki taadad: ",
    txt_drafting: "Drafting...",`;

content = content.replace(/    btn_generate: "Generate Official Application",/, englishKeys);
content = content.replace(/    btn_generate: "باضابطہ قانونی درخواست تیار کریں",/, urduKeys);
content = content.replace(/    btn_generate: "Ba-Zabta Qanooni Darkhwast Tayyar Karein",/, romanKeys);

fs.writeFileSync('src/translations.ts', content);
