const axios = require("axios");

async function generateVideo(prompt) {

    const API_KEY = process.env.HUGGINGFACE_API_KEY;

    if (!API_KEY || API_KEY === "test") {
        return {
            success: false,
            provider: "HuggingFace",
            model: "LTX-Video",
            message: "HuggingFace API Key Missing"
        };
    }

    try {

        const response = await axios.post(

            "https://router.huggingface.co/v1/video/generations",

            {
                model: "Lightricks/LTX-Video",
                inputs: prompt
            },

            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 300000
            }

        );

        console.log("HF Response:", response.data);

        return {
            success: true,
            provider: "HuggingFace",
            model: "LTX-Video",
            video: response.data?.data?.[0]?.url || null,
            prompt
        };

    } catch (err) {

        console.log("========== HF ERROR ==========");
        console.log("Status:", err.response?.status);
        console.log("Data:", JSON.stringify(err.response?.data, null, 2));
        console.log("==============================");

        return {
            success: false,
            provider: "HuggingFace",
            model: "LTX-Video",
            message: err.response?.data?.error || err.message
        };

    }

}

module.exports = {
    generateVideo
};
