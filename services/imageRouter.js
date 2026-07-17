const pollinations = require("./imageProviders/pollinations");
const huggingface = require("./imageProviders/huggingface");

async function generateImage(prompt) {

    const providers = [
        pollinations,
        huggingface
    ];

    for (const provider of providers) {

        try {

            const result = await provider.generateImage(prompt);

            if (result && result.success) {
                return result;
            }

        } catch (err) {

            console.log("Image Provider Failed:", err.message);

        }

    }

    throw new Error("All Image Providers Failed.");

}

module.exports = {
    generateImage
};
