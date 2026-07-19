console.log(require("fs").readdirSync(__dirname + "/videoProviders"));

const openmontage = require("./videoProviders/openmontage");
const huggingface = require("./videoProviders/huggingface");

async function generateVideo(prompt) {

    const providers = [
        openmontage
    ];

    if (
        process.env.HUGGINGFACE_API_KEY &&
        process.env.HUGGINGFACE_API_KEY !== "test"
    ) {
        providers.push(huggingface);
    }

    for (const provider of providers) {

        try {

            const result = await provider.generateVideo(prompt);

            if (result && result.success) {
                return result;
            }

        } catch (err) {

            console.log("Video Provider Failed:", err.message);

        }

    }

    return {
        success: false,
        provider: "None",
        model: "None",
        message: "No free video provider configured yet."
    };

}

module.exports = {
    generateVideo
};
