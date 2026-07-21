const freevideo = require("./videoProviders/freevideo");
const huggingface = require("./videoProviders/huggingface");

async function generateVideo(prompt) {

    // Pehle HuggingFace try karega
    if (
        process.env.HUGGINGFACE_API_KEY &&
        process.env.HUGGINGFACE_API_KEY !== "test"
    ) {
        try {
            return await huggingface.generateVideo(prompt);
        } catch (err) {
            console.log("HuggingFace Failed:", err.message);
        }
    }

    // Agar HF fail ho jaye to FreeVideo fallback
    try {
        return await freevideo.generateVideo(prompt);
    } catch (err) {
        return {
            success: false,
            provider: "None",
            model: "None",
            message: "Video Generation Failed."
        };
    }
}

module.exports = {
    generateVideo
};
