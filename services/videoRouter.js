const providers = [];

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

            if (result.success) {
                return result;
            }

        } catch (err) {

            console.log(`${provider.provider || "Provider"} Failed`);

        }

    }

    return {
        success: false,
        provider: "None",
        model: "None",
        message: "No video provider available."
    };

}

module.exports = {
    generateVideo
};
