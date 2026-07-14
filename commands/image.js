const aiRouter = require("../services/aiRouter");
const imageManager = require("../services/imageManager");
const characterBuilder =
require("../services/characterBuilder");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/image (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🖼 Creating AI Image..."
      );

      const character =
await characterBuilder.buildCharacter(topic);

const prompt =
await aiRouter.generate(prompt);
      const imageUrl =
await imageManager.generate(prompt);
      
      await bot.sendPhoto(
        chatId,
        imageUrl,
        {
          caption: "🎨 Generated using FLUX AI"
        }
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
