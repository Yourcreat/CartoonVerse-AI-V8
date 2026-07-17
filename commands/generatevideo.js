const videoRouter = require("../services/videoRouter");

module.exports = function (bot) {

    bot.onText(/\/generatevideo (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const prompt = match[1];

        try {

            await bot.sendMessage(
                chatId,
                "🎥 Generating AI Video..."
            );

            const result =
                await videoRouter.generateVideo(prompt);

            if (result.video) {

                await bot.sendMessage(
                    chatId,

`✅ Video Generated

Provider: ${result.provider}

Model: ${result.model}

Video URL:
${result.video}`
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
                "❌ Video Generation Failed."
            );

        }

    });

};
