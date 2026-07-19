const imageRouter = require("../services/imageRouter");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/generateimage (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const prompt = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🎨 Generating Free AI Image..."
      );

      const result = await imageRouter.generateImage(prompt);
        
      console.log(result);
     
      if (!result.success) {

        return await bot.sendMessage(
          chatId,
          "❌ Image Generation Failed."
        );

      }

      await bot.sendMessage(
        chatId,
        `✅ Image Generated Successfully

Provider: ${result.provider}

🖼️ Image Link:
${result.image}`
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Image Generation Failed."
      );

    }

  });

};
