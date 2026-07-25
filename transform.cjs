const fs = require('fs');

const data = fs.readFileSync('src/data/departments.ts', 'utf8');
const start = data.indexOf(' = [') + 3;
const end = data.lastIndexOf(']') + 1;
const arrStr = data.substring(start, end);

const departments = new Function('return ' + arrStr)();

const enDepartments = departments.map(d => ({
  id: d.id,
  name: d.nameEnglish,
  officerTitle: d.officerTitleEnglish,
  iconName: d.iconName,
  badgeColor: d.badgeColor,
  officerLabel: "COMPETENT OFFICER:",
  samplesTitle: "Preset Quick Samples:",
  samples: d.samples.map(s => ({
    title: s.titleEnglish,
    description: s.descriptionRoman
  }))
}));

const urDepartments = departments.map(d => ({
  id: d.id,
  name: d.nameUrdu,
  officerTitle: d.officerTitleUrdu,
  iconName: d.iconName,
  badgeColor: d.badgeColor,
  officerLabel: "افسرِ مجاز:",
  samplesTitle: "فوری شکایت کے نمونے (Preset Samples):",
  samples: d.samples.map(s => ({
    title: s.titleUrdu,
    description: s.descriptionUrdu 
  }))
}));

const romanDepartments = departments.map(d => ({
  id: d.id,
  name: d.nameEnglish,
  officerTitle: d.officerTitleEnglish,
  iconName: d.iconName,
  badgeColor: d.badgeColor,
  officerLabel: "Afsar-e-Mujaz:",
  samplesTitle: "Fauri Shikayat Ke Namoonay:",
  samples: d.samples.map(s => ({
    title: s.titleEnglish,
    description: s.descriptionRoman
  }))
}));

let trans = fs.readFileSync('src/translations.ts', 'utf8');

trans = trans.replace(/en: \{/, 'en: {\n    departments: ' + JSON.stringify(enDepartments, null, 4) + ',');
trans = trans.replace(/ur: \{/, 'ur: {\n    departments: ' + JSON.stringify(urDepartments, null, 4) + ',');
trans = trans.replace(/roman: \{/, 'roman: {\n    departments: ' + JSON.stringify(romanDepartments, null, 4) + ',');

fs.writeFileSync('src/translations.ts', trans);
console.log("Done");
