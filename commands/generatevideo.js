const videoRouter = require("../services/videoRouter");

module.exports = function (
    bot,
    ai,
    sendLongMessage,
    database
) {

    bot.onText(/\/generatevideo (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const prompt = match[1];

        try {

            await bot.sendMessage(
                chatId,
                "🎥 Generating AI Video..."
            );

            const result = await videoRouter.generateVideo(prompt);

            if (!result.success) {

                return await bot.sendMessage(
                    chatId,
                    `⚠️ ${result.message}

Provider: ${result.provider}`
                );

            }

            await bot.sendMessage(
                chatId,
                `✅ Video Generated

Provider: ${result.provider}

Model: ${result.model}
await bot.sendVideo(chatId, result.video, {
    caption:
`✅ Video Generated

Provider: ${result.provider}

Model: ${result.model}`
});

