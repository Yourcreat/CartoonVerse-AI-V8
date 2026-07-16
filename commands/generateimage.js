const aiRouter = require("../services/aiRouter");
const openAI = require("../services/openGenerativeAI");

module.exports = function (bot) {

    bot.onText(/\/generateimage (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const input = match[1];

        const args = input.split(" ");

        const mode = args.shift().toLowerCase();

        const topic = args.join(" ");

        try {

            // =========================
            // PROMPT MODE
            // =========================

            if (mode === "prompt") {

                await bot.sendMessage(
                    chatId,
                    "🎨 Creating Professional Image Prompts..."
                );

                const prompt = `
You are Pixar Image Prompt Engineer.

Topic:
${topic}

Create EXACTLY 10 Image Prompts.

Rules:

Pixar Style

Disney Style

Ultra Detailed

3D Animation

Same Character

Cinematic Lighting

Family Friendly

Return:

Scene 1

Prompt

Scene 2

Prompt

...

Scene 10

Prompt
`;

                const result = await aiRouter.generate(prompt);

                return bot.sendMessage(chatId, result);

            }

            // =========================
            // AI IMAGE MODE
            // =========================

            if (mode === "ai") {

                await bot.sendMessage(
                    chatId,
                    "🖼 Creating AI Image..."
                );

                const result =
                    await openAI.generateImage(topic);

                return bot.sendMessage(
                    chatId,
`✅ Image Created

Provider:
${result.provider}

Model:
${result.model}

Prompt:
${result.prompt}`
                );

            }

            // =========================
            // HELP
            // =========================

            return bot.sendMessage(
                chatId,
`Usage:

/generateimage prompt cat hero

OR

/generateimage ai cat hero`
            );

        } catch (err) {

            console.error(err);

            bot.sendMessage(
                chatId,
                "❌ Image Generation Failed."
            );

        }

    });

};
