const gemini = require("./gemini");
const huggingface = require("./providers/huggingface");

async function generate(prompt) {

    const providers = [

        {
            name: "Gemini",
            fn: gemini.generate
        },

        {
            name: "Groq",
            fn: groq.generate
        },

        {
            name: "DeepSeek",
            fn: deepseek.generate
        },

        {
            name: "Qwen",
            fn: qwen.generate
        },

        {
            name: "OpenRouter",
            fn: openrouter.generate
        },

        {
            name: "HuggingFace",
            fn: huggingface.generate
        }

    ];

    for (const provider of providers) {

        try {

            console.log(`🚀 Trying ${provider.name}`);

            const result = await provider.fn(prompt);

            if (result) {

                console.log(`✅ ${provider.name} Success`);

                return result;

            }

        } catch (err) {

            console.log(`❌ ${provider.name} Failed`);

        }

    }

    throw new Error("No AI Provider Available.");

}

module.exports = {
    generate
};
