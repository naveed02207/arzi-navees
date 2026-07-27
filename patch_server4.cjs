const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /const prompt = `Raw Complaint Input:[\s\S]*?res\.json\(\{[\s\S]*?applicationText: parsedResult\.applicationText\n    \}\);\n/m;
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
    });
`;

if (regex.test(code)) {
    code = code.replace(regex, newCode);
    fs.writeFileSync('server.ts', code);
    console.log("Replaced successfully!");
} else {
    console.log("Regex didn't match. Printing what's around prompt:");
    const idx = code.indexOf('const prompt =');
    console.log(code.slice(idx, idx + 500));
}
