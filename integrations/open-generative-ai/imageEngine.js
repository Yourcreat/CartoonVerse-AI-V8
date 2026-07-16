const axios = require("axios");
const config = require("./config");

async function generateImage(prompt) {

    console.log("🖼 Image Engine Started");

    const apiKey = process.env.OPEN_GENERATIVE_AI_KEY;

    if (!apiKey) {
        throw new Error("OPEN_GENERATIVE_AI_KEY Missing");
    }

    const response = await axios.post(

        "https://api.opengenerative.ai/v1/images/generations",

        {
            model: config.DEFAULT_IMAGE_MODEL,
            prompt: prompt,
            size: "1024x1024"
        },

        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            timeout: config.TIMEOUT
        }

    );

    return {
        success: true,
        provider: config.IMAGE_PROVIDER,
        model: config.DEFAULT_IMAGE_MODEL,
        prompt,
        image: response.data.data[0].url
    };

}

module.exports = {
    generateImage
};
