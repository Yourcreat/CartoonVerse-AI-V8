
const axios = require("axios");

async function generate(prompt) {

    if (
        !process.env.OPENROUTER_API_KEY ||
        process.env.OPENROUTER_API_KEY === "test"
    ) {
        throw new Error("OpenRouter API Key Missing");
    }

    const response = await axios.post(

        "https://openrouter.ai/api/v1/chat/completions",

        {

            model: "deepseek/deepseek-chat-v3-0324:free",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.8,
            max_tokens: 4096

        },

        {

            headers: {

                Authorization:
                    `Bearer ${process.env.OPENROUTER_API_KEY}`,

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
