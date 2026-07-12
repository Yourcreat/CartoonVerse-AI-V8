const gemini = require("../services/gemini");
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
await gemini.generate(`

You are the world's best Pixar concept artist.

${character}

Create ONE cinematic image prompt.

Topic:
${topic}

Rules:

- Character must stay exactly the same.
- Never change clothes.
- Never change face.
- Never change hairstyle.
- Keep the same age.
- Pixar 3D.
- Cinematic.
- Ultra detailed.
- Beautiful lighting.
- Highly colorful.
- YouTube thumbnail quality.
- 8K.
- Family friendly.
- Topic must be clearly visible.

Return ONLY the image prompt.

`);
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
