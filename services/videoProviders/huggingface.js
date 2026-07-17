const axios = require("axios");

async function generateVideo(prompt) {

    if (
        !process.env.HUGGINGFACE_API_KEY ||
        process.env.HUGGINGFACE_API_KEY === "test"
    ) {
        throw new Error("HuggingFace API Key Missing");
    }

    const response = await axios.post(

        "https://router.huggingface.co/v1/video/generations",

        {
            model: "Lightricks/LTX-Video",
            prompt: prompt
        },

        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json"
            },
            timeout: 120000
        }

    );

    return {
        success: true,
        provider: "HuggingFace",
        model: "LTX-Video",
        video: response.data.data[0].url,
        prompt
    };

}

module.exports = {
    generateVideo
};
