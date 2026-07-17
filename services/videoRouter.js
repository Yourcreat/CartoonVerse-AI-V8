const huggingface = require("./videoProviders/huggingface");

async function generateVideo(prompt) {

    const providers = [
        huggingface
    ];

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

    throw new Error("All Video Providers Failed.");

}

module.exports = {
    generateVideo
};
