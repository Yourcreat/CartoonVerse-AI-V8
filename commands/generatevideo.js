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
          `⚠️ ${result.message}`
        );

      }

      await bot.sendMessage(
        chatId,
        `✅ Video Generated

Provider: ${result.provider}

Model: ${result.model}

Video:
${result.video}`
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Video Generation Failed."
      );

    }

  });

};
