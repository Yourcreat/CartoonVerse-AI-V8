const aiRouter = require("../services/aiRouter");

module.exports = function (
    bot,
    ai,
    sendLongMessage,
    database
) {

    bot.onText(/\/generateimage (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const topic = match[1];

        try {

            await bot.sendMessage(
                chatId,
                "🎨 Creating Professional Pixar Image Prompts..."
            );

            const prompt = `
You are a Pixar Image Prompt Engineer.

Topic:
${topic}

Create EXACTLY 10 cinematic image prompts.

Rules:

- Pixar Style
- Disney Style
- 3D Animation
- Ultra Detailed
- Family Friendly
- Cinematic Lighting
- Vibrant Colors
- Same Character in every prompt

Return:

Scene 1
Image Prompt

Scene 2
Image Prompt

...

Scene 10
Image Prompt
`;

            const result = await aiRouter.generate(prompt);

            await sendLongMessage(
                bot,
                chatId,
                result
            );

        } catch (err) {

            console.error(err);

            await bot.sendMessage(
                chatId,
                "❌ Image Prompt Generation Failed."
            );

        }

    });

};
