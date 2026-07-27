const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /      details: error\.message\n    \}\);/,
  '      details: "An internal server error occurred."\n    });'
);

code = code.replace(
  /res\.status\(500\)\.json\(\{ error: error\.message \}\);/,
  'res.status(500).json({ error: "An unexpected error occurred while processing your request." });'
);

fs.writeFileSync('server.ts', code);
