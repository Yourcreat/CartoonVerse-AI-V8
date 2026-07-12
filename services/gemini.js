const { GoogleGenAI } = require("@google/genai");

const keys = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3
].filter(Boolean);

let currentKey = 0;

async function generate(prompt) {

  for (let i = 0; i < keys.length; i++) {

    const index = (currentKey + i) % keys.length;

    try {

      const ai = new GoogleGenAI({
        apiKey: keys[index]
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      currentKey = index;

      return response.text;

    } catch (err) {

      console.log(
        `❌ API ${index + 1} Failed`
      );

      if (
        err.message &&
        (
          err.message.includes("429") ||
          err.message.includes("RESOURCE_EXHAUSTED") ||
          err.message.includes("Quota")
        )
      ) {

        console.log(
          `⚡ Switching to API ${index + 2}`
        );

        continue;

      }

      console.error(err);

    }

  }

  return `⚠️ All Gemini API Keys have reached their limits.

Please add a new API Key in Railway.

Bot Status:
✅ Online`;
}

module.exports = {
  generate
};
