const { GoogleGenAI } = require("@google/genai");

const keys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3
].filter(Boolean);

let currentKey = 0;

async function generate(prompt) {

    if (keys.length === 0) {
        throw new Error("No Gemini API Keys Found.");
    }

    for (let i = 0; i < keys.length; i++) {

        const index = (currentKey + i) % keys.length;

        try {

            console.log(`🚀 Gemini API ${index + 1}`);

            const ai = new GoogleGenAI({
                apiKey: keys[index]
            });

            const response =
                await Promise.race([

                    ai.models.generateContent({
                        model: "gemini-2.5-flash",
                        contents: prompt
                    }),

                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error("Timeout")), 60000)
                    )

                ]);

            const text = response.text;

            if (!text || text.trim() === "") {
                throw new Error("Empty Gemini Response");
            }

            currentKey = index;

            console.log(`✅ Gemini API ${index + 1} Success`);

            return text;

        } catch (err) {

            console.log(`❌ Gemini API ${index + 1} Failed`);

            const message = err?.message || "";

            if (
                message.includes("429") ||
                message.includes("RESOURCE_EXHAUSTED") ||
                message.includes("Quota") ||
                message.includes("Timeout")
            ) {

                console.log("⚡ Switching API Key...");
                continue;

            }

            throw err;

        }

    }

    throw new Error("All Gemini API Keys Failed.");

}

module.exports = {
    generate
};
