const huggingfaceAI = require("./aiProviders/huggingface");
const pollinationsAI = require("./aiProviders/pollinations");
const openrouterAI = require("./aiProviders/openrouter");
const groqAI = require("./aiProviders/groq");
const deepseekAI = require("./aiProviders/deepseek");
const qwenAI = require("./aiProviders/qwen");

async function generate(prompt) {

  const providers = [
    huggingfaceAI,
    pollinationsAI,
    openrouterAI,
    groqAI,
    deepseekAI,
    qwenAI
  ];

  for (const provider of providers) {

    try {

      const result = await provider.generate(prompt);

      if (result) {
        return result;
      }

    } catch (err) {

      console.log("Provider Failed:", err.message);

    }

  }

  throw new Error("All Free AI Providers Failed.");

}

module.exports = {
  generate
};
