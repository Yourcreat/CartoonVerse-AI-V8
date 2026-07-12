const gemini = require("../services/gemini");
const imageGenerator = require("../services/imageGenerator");

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

      const prompt = await gemini.generate(`

Create one Pixar style image prompt.

Topic:
${topic}

Ultra detailed

3D

Pixar

Cinematic Lighting

8K

`);

      const imageUrl =
        await imageGenerator.generateImage(prompt);

      await bot.sendPhoto(
        chatId,
        imageUrl,
        {
          caption:
            "🎨 CartoonVerse AI Image"
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
