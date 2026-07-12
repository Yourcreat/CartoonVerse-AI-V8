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

const prompt = `
You are a professional Pixar concept artist.

Create ONE highly detailed image prompt.

Topic:
${topic}

Requirements:
- Keep the main subject exactly about the topic.
- No random characters or objects.
- Pixar 3D animation style.
- Cinematic composition.
- Vibrant colors.
- Highly detailed.
- Consistent character design.
- Full body.
- Clean background.
- 8K quality.
- Suitable for YouTube thumbnail.

Return ONLY the image prompt.
`;

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
