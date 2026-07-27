const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// The block we want to replace starts with "const prompt =" and ends at "    res.json({"
const newPromptBlock = `    const prompt = \`Raw Complaint Input:
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
  } catch (error: any) {`;

code = code.replace(/const prompt = `Raw Complaint Input:[\s\S]*?res\.json\(\{[\s\S]*?applicationText: parsedResult\.applicationText\n    \}\);\n  \} catch \(error: any\) \{/, newPromptBlock);

fs.writeFileSync('server.ts', code);
