const gemini = require("./gemini");

async function generate(prompt) {

    // ======================
    // GEMINI
    // ======================

    try {

        console.log("🚀 Sending request to Gemini...");

        const result = await gemini.generate(prompt);

        console.log("✅ Gemini Success");

        return result;

    } catch (err) {

        console.error("❌ Gemini Failed:", err.message);

    }

    // ======================
    // FUTURE AI PROVIDERS
    // ======================

    /*
    try {
        return await qwen.generate(prompt);
    } catch (err) {
        console.error("Qwen Failed:", err.message);
    }

    try {
        return await together.generate(prompt);
    } catch (err) {
        console.error("Together Failed:", err.message);
    }

    try {
        return await openrouter.generate(prompt);
    } catch (err) {
        console.error("OpenRouter Failed:", err.message);
    }
    */

    throw new Error("❌ No AI Provider Available.");

}

module.exports = {
    generate
};
