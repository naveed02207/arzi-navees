const fs = require('fs');

let ds = fs.readFileSync('src/components/DepartmentSelector.tsx', 'utf8');

ds = ds.replace(
  'const { t, getTextClass } = useLanguage();',
  'const { t, getTextClass, uiLanguage } = useLanguage();'
);

ds = ds.replace(
  '<span className="text-xs font-semibold font-urdu leading-tight text-right w-full">\n                {tDept.name}\n              </span>\n              <span className={`text-[10px] font-sans mt-1 truncate w-full text-left ${isSelected ? "text-emerald-100" : "text-gray-500"}`}>\n                {tDept.name}\n              </span>',
  '<span className="text-xs font-semibold font-urdu leading-tight text-right w-full">\n                {tDept.name}\n              </span>'
);

fs.writeFileSync('src/components/DepartmentSelector.tsx', ds);
console.log("Done fixing DS");
