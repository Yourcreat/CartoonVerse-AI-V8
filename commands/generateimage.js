const imageRouter = require("../services/imageRouter");

module.exports = function (bot) {

    bot.onText(/\/generateimage (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const prompt = match[1];

        try {

            await bot.sendMessage(
                chatId,
                "🎨 Generating Image..."
            );

            const result =
                await imageRouter.generateImage(prompt);

            if (result.image.startsWith("http")) {

                await bot.sendPhoto(
                    chatId,
                    result.image,
                    {
                        caption:
`✅ Image Generated

Provider: ${result.provider}

Model: ${result.model}`
                    }
                );

            } else {

                await bot.sendMessage(
                    chatId,
                    JSON.stringify(result, null, 2)
                );

            }

        } catch (err) {

            console.error(err);

            await bot.sendMessage(
                chatId,
                "❌ Image Generation Failed."
            );

        }

    });

};
