const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace known comments
content = content.replace('// History & Storage state', '');
content = content.replace('// Guide & Q&A Modal states', '');
content = content.replace('// Load saved history & applicant details from localStorage on startup', '');
content = content.replace('// Scroll preview into view smoothly', '');
content = content.replace('// Top Bar Navigation', '');
content = content.replace('// Main Content Area', '');
content = content.replace('// Editorial Hero Banner', '');
content = content.replace('// Step 1: Department Selection', '');
content = content.replace('// Step 2: Applicant Information Form', '');
content = content.replace('// Step 3: Raw Complaint Input', '');
content = content.replace('// Error Notification', '');
content = content.replace('// Step 4: Final Formal Legal Application Preview & Actions', '');
content = content.replace('// Editorial Footer', '');
content = content.replace('// Modals & Drawers', '');

fs.writeFileSync('src/App.tsx', content);

