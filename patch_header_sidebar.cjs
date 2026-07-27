const fs = require('fs');

let header = fs.readFileSync('src/components/Header.tsx', 'utf8');
header = header.replace('bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 border-b border-emerald-900', 'bg-white border-b border-gray-200');
header = header.replace(/text-white/g, 'text-gray-900');
header = header.replace(/bg-teal-600/g, 'bg-emerald-600');
header = header.replace(/bg-white\/10 border border-white\/20 hover:bg-white hover:text-emerald-900/g, 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:text-emerald-700 text-gray-700');
header = header.replace(/hover:bg-white\/10/g, 'hover:bg-gray-100');
header = header.replace(/text-emerald-200/g, 'text-emerald-700');
header = header.replace(/text-slate-800/g, 'text-gray-900');
header = header.replace(/bg-white\/10 hover:bg-emerald-100/g, 'bg-emerald-50 hover:bg-emerald-100');
header = header.replace(/text-white hidden sm:block/g, 'text-gray-600 hidden sm:block');

fs.writeFileSync('src/components/Header.tsx', header);

let sidebar = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');
sidebar = sidebar.replace('bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 border-e border-emerald-900', 'bg-white border-e border-gray-200');
sidebar = sidebar.replace(/text-white/g, 'text-gray-700');
sidebar = sidebar.replace(/bg-white\/20 text-white shadow-md/g, 'bg-emerald-50 text-emerald-800 shadow-sm border border-emerald-100');
sidebar = sidebar.replace(/hover:bg-white\/10/g, 'hover:bg-gray-50');
sidebar = sidebar.replace(/border-emerald-600\/30/g, 'border-gray-200');
sidebar = sidebar.replace(/text-white\/80/g, 'text-gray-500');

// Replace specific white background badges in sidebar
sidebar = sidebar.replace(/bg-white text-emerald-800/g, 'bg-emerald-100 text-emerald-800');

fs.writeFileSync('src/components/Sidebar.tsx', sidebar);
