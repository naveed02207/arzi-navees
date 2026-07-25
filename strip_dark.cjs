const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove all dark: classes
  content = content.replace(/dark:[a-zA-Z0-9\-\/\[\]]+/g, '');
  
  // Replace specific heavy dark backgrounds with white if they aren't already
  // usually these were used for text or dark mode bg.
  // Actually, if it was just bg-gray-900 and not dark:bg-gray-900, it might be for a button or text.
  // We should be careful about text-gray-900.
  // The user said: "Remove EVERY instance of heavy dark colors (like bg-slate-900, bg-slate-800, bg-gray-900)"
  content = content.replace(/bg-gray-900/g, 'bg-white');
  content = content.replace(/bg-gray-800/g, 'bg-white');
  content = content.replace(/bg-slate-900/g, 'bg-white');
  content = content.replace(/bg-slate-800/g, 'bg-white');

  // Also clean up multiple spaces
  content = content.replace(/\s+/g, ' ');
  
  fs.writeFileSync(file, content);
});

console.log("Stripped dark classes and heavy dark backgrounds");
