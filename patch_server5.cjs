const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const idxStart = code.indexOf('const prompt =');
const idxEnd = code.indexOf('res.json({', idxStart);
const idxEndActual = code.indexOf('});', idxEnd) + 3; // up to the end of res.json

const oldBlock = code.slice(idxStart, idxEndActual);
console.log("Found block to replace length:", oldBlock.length);

const newCode = `const prompt = \`Raw Complaint Input:
"\${rawComplaint}"

Generate the complete, pristine, formal administrative application string formatted strictly according to the system rules above. Do NOT include any markdown formatting, JSON, or additional notes. Just return the text of the application.\`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction
      }
    });

    const resultText = response.text || "";

    res.json({
      success: true,
      applicationText: resultText
    });`;

code = code.slice(0, idxStart) + newCode + code.slice(idxEndActual);
fs.writeFileSync('server.ts', code);
console.log("Successfully replaced!");
