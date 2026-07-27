const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const startIndex = code.indexOf('const prompt = `Raw Complaint Input:');
const endIndex = code.indexOf('} catch (error: any) {', startIndex);

console.log("Start:", startIndex, "End:", endIndex);

