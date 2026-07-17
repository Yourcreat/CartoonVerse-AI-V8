const gemini = require("./gemini");
const huggingface = require("./providers/huggingface");

async function generate(prompt) {
    const providers = [
        {
            name: "Gemini",
            fn: gemini.generate
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
            console.log(`❌ ${provider.name}: ${err.message}`);
        }
    }

    throw new Error("All AI Providers Failed.");
}

module.exports = {
    generate
};
