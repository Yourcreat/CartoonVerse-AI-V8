const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generate(prompt) {

  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (err) {

    console.error(err);

    // Quota Exceeded
    if (
      err.message &&
      (
        err.message.includes("429") ||
        err.message.includes("RESOURCE_EXHAUSTED") ||
        err.message.includes("Quota")
      )
    ) {

      return `⚠️ Gemini Daily Limit Reached

Your free API quota has finished.

Please:

1️⃣ Wait until tomorrow

OR

2️⃣ Create a new Gemini API Key

Bot Status:
✅ Online
`;

    }

    return `❌ Gemini Error

${err.message}`;

  }

}

module.exports = {
  generate,
};
