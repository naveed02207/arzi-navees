const fs = require('fs');

let ds = fs.readFileSync('src/components/DepartmentSelector.tsx', 'utf8');

ds = ds.replace(
  'import { DEPARTMENTS, Department } from "../data/departments";',
  'import { Department, DEPARTMENTS } from "../data/departments";\nimport { translations } from "../translations";'
);

ds = ds.replace(
  'const selectedDept = DEPARTMENTS.find((d) => d.id === selectedDepartmentId) || DEPARTMENTS[0];',
  'const translatedDepts = (translations as any)[uiLanguage].departments || [];\n  const selectedTranslatedDept = translatedDepts.find((d: any) => d.id === selectedDepartmentId) || translatedDepts[0];\n  const selectedDept = DEPARTMENTS.find((d) => d.id === selectedDepartmentId) || DEPARTMENTS[0];'
);

ds = ds.replace(
  '{DEPARTMENTS.map((dept) => {',
  '{translatedDepts.map((tDept: any) => {\n          const dept = DEPARTMENTS.find(d => d.id === tDept.id) || DEPARTMENTS[0];'
);

ds = ds.replace(
  '{dept.nameUrdu}',
  '{tDept.name}'
);
ds = ds.replace(
  '{dept.nameEnglish}',
  '{tDept.name}'
);
ds = ds.replace(
  '{dept.officerTitleUrdu}',
  '{tDept.officerTitle}'
);
ds = ds.replace(
  'افسرِ مجاز:',
  '{tDept.officerLabel}'
);

ds = ds.replace(
  '{selectedDept.samples && selectedDept.samples.length > 0 && (',
  '{selectedTranslatedDept && selectedTranslatedDept.samples && selectedTranslatedDept.samples.length > 0 && ('
);
ds = ds.replace(
  'فوری شکایت کے نمونے (Preset Samples):',
  '{selectedTranslatedDept.samplesTitle}'
);
ds = ds.replace(
  '{selectedDept.samples.map((sample, idx) => (',
  '{selectedTranslatedDept.samples.map((sample: any, idx: number) => ('
);
ds = ds.replace(
  'onClick={() => onSelectSamplePrompt(sample.descriptionUrdu, sample.titleUrdu)}',
  'onClick={() => onSelectSamplePrompt(sample.description, sample.title)}'
);
ds = ds.replace(
  '✦ {sample.titleUrdu}',
  '✦ {sample.title}'
);

fs.writeFileSync('src/components/DepartmentSelector.tsx', ds);
console.log("Done patching");
