const { GoogleGenAI } = require("@google/genai");

const keys = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean);

let currentKey = 0;

async function generate(prompt) {

  if (keys.length === 0) {
    throw new Error("No Gemini API Keys Found.");
  }

  for (let i = 0; i < keys.length; i++) {

    const index = (currentKey + i) % keys.length;

    try {

      const ai = new GoogleGenAI({
        apiKey: keys[index]
      });

      const response =
        await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt
        });

      currentKey = index;

      return response.text;

    } catch (err) {

      console.log(`❌ Gemini API ${index + 1} Failed`);

      const message = err?.message || "";

      if (
        message.includes("429") ||
        message.includes("RESOURCE_EXHAUSTED") ||
        message.includes("Quota")
      ) {

        console.log("⚡ Trying Next Gemini API...");
        continue;

      }

      throw err;

    }

  }

  throw new Error("All Gemini API Keys reached quota.");

}

module.exports = {
  generate
};
