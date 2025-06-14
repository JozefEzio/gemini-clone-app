import { GoogleGenAI } from "@google/genai";
const apiKey= 'AIzaSyCJjfGGalgknXweKKfOdp9U9ipOXSIQB14';

const ai = new GoogleGenAI({ apiKey: `${apiKey}` });

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text
}

export default main;