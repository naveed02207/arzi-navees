const fs = require('fs');

// SIDEBAR
let sidebar = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

sidebar = sidebar.replace(
  'bg-white  border-r border-gray-200 ',
  'bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 border-r border-emerald-900 '
);

// We need to replace all text-gray-600, text-gray-500, etc. with text-emerald-100 or text-white
// actually, let's just use string replacements or Regex
sidebar = sidebar.replace(/text-gray-600/g, 'text-emerald-50');
sidebar = sidebar.replace(/text-gray-500/g, 'text-emerald-100');
sidebar = sidebar.replace(/text-gray-400/g, 'text-emerald-100');
sidebar = sidebar.replace(/hover:bg-emerald-50/g, 'hover:bg-emerald-600/50');
sidebar = sidebar.replace(/hover:text-emerald-700/g, 'hover:text-white');
sidebar = sidebar.replace(/text-emerald-700/g, 'text-white');
sidebar = sidebar.replace(/text-emerald-800/g, 'text-emerald-900');

fs.writeFileSync('src/components/Sidebar.tsx', sidebar);

// HEADER
let header = fs.readFileSync('src/components/Header.tsx', 'utf8');

header = header.replace(
  'bg-white  border-b border-gray-200 ',
  'bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 border-b border-emerald-900 '
);
header = header.replace(/text-gray-900/g, 'text-white');
header = header.replace(/text-gray-700/g, 'text-emerald-50');
header = header.replace(/text-gray-600/g, 'text-emerald-100');
header = header.replace(/text-gray-500/g, 'text-emerald-100');
header = header.replace(/text-emerald-700/g, 'text-emerald-100');
header = header.replace(/bg-gray-50/g, 'bg-emerald-800/30');
header = header.replace(/bg-white/g, 'bg-emerald-800/50');
header = header.replace(/bg-emerald-50/g, 'bg-emerald-600/30');
header = header.replace(/hover:bg-gray-50/g, 'hover:bg-emerald-700');
header = header.replace(/hover:text-emerald-700/g, 'hover:text-white');
header = header.replace(/text-emerald-600/g, 'text-emerald-100');
header = header.replace(/bg-emerald-600/g, 'bg-teal-500'); // the history badge
header = header.replace(/bg-emerald-700/g, 'bg-teal-600'); // brand icon bg
header = header.replace(/border-gray-200/g, 'border-emerald-600/30');

fs.writeFileSync('src/components/Header.tsx', header);

console.log("Done updating bars");
