const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Just slice between "const prompt = `Raw Complaint Input:" and "  } catch (error: any) {"
const startStr = 'const prompt = `Raw Complaint Input:';
const endStr = '} catch (error: any) {';
const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
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
  } catch (error: any) {`;
  
  code = code.slice(0, startIndex) + newCode + code.slice(endIndex + endStr.length);
  fs.writeFileSync('server.ts', code);
}
