const gemini = require("./gemini");

async function generate(prompt) {

  // Gemini
  try {

    const result = await gemini.generate(prompt);

    if (
      result &&
      !result.includes("All Gemini API Keys")
    ) {

      console.log("✅ Gemini");

      return result;

    }

  } catch (e) {

    console.log("❌ Gemini Failed");

  }

  // Future Providers

  console.log("⚠ Switching Provider...");

  return "⚠ No AI Provider Available.";

}

module.exports = {
  generate
};
