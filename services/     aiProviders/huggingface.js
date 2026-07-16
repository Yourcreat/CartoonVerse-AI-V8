const axios = require("axios");

async function generate(prompt) {

    if (!process.env.HUGGINGFACE_API_KEY) {
        throw new Error("Missing HuggingFace API Key");
    }

    const response = await axios.post(

        "https://router.huggingface.co/v1/chat/completions",

        {

            model: "Qwen/Qwen3-235B-A22B-Instruct-2507",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            max_tokens: 4096

        },

        {

            headers: {

                Authorization:
                    `Bearer ${process.env.HUGGINGFACE_API_KEY}`,

                "Content-Type": "application/json"

            },

            timeout: 120000

        }

    );

    return response.data.choices[0].message.content;

}

module.exports = {
    generate
};
