const gemini = require("./gemini");

async function generate(prompt) {

  // ======================
  // GEMINI
  // ======================

  try {

    const result = await gemini.generate(prompt);

    console.log("✅ Gemini Success");

    return result;

  } catch (err) {

    console.log("❌ Gemini Failed");

  }

  // ======================
  // FUTURE AI PROVIDERS
  // ======================

  /*
  try {

      return await qwen.generate(prompt);

  } catch(e) {}

  try {

      return await together.generate(prompt);

  } catch(e) {}

  try {

      return await openrouter.generate(prompt);

  } catch(e) {}
  */

  throw new Error("No AI Provider Available.");

}

module.exports = {
  generate
};
