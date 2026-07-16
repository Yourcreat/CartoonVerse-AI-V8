const axios = require("axios");

async function generate(prompt) {

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "test") {
        throw new Error("Groq API Key Missing");
    }

    const response = await axios.post(

        "https://api.groq.com/openai/v1/chat/completions",

        {
            model: "llama-3.3-70b-versatile",

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
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
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
