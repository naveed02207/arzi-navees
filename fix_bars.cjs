const fs = require('fs');

let sidebar = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');
sidebar = sidebar.replace(/text-emerald-50/g, 'text-white');
sidebar = sidebar.replace(/text-emerald-100/g, 'text-white');
sidebar = sidebar.replace(/bg-emerald-600\/50/g, 'bg-white/10');
sidebar = sidebar.replace(/bg-emerald-600/g, 'bg-white/20');
fs.writeFileSync('src/components/Sidebar.tsx', sidebar);

let header = fs.readFileSync('src/components/Header.tsx', 'utf8');
header = header.replace(/text-emerald-50/g, 'text-white');
header = header.replace(/text-emerald-100/g, 'text-white');
header = header.replace(/bg-emerald-800\/50/g, 'bg-white/10');
header = header.replace(/bg-emerald-800\/30/g, 'bg-white/10');
header = header.replace(/bg-teal-500\/30/g, 'bg-white/10');
header = header.replace(/border-emerald-600\/30/g, 'border-white/20');
fs.writeFileSync('src/components/Header.tsx', header);

console.log("Fixed bars text colors");
