const gemini = require("../services/gemini");
const imageManager = require("../services/imageManager");
const characterBuilder = require("../services/characterBuilder");

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

      // Create base prompt with Gemini
      const prompt = await gemini.generate(`

You are a professional Pixar concept artist.

Create ONE highly detailed image prompt.

Topic:
${topic}

Requirements:

- Keep the main subject exactly about the topic.
- Pixar 3D Animation
- Disney Style
- Cinematic Lighting
- Vibrant Colors
- Full Body
- Ultra Detailed
- 8K
- Family Friendly
- Professional Composition
- Suitable for YouTube

Return ONLY the image prompt.

`);

      // Add Character Memory
      const finalPrompt =
        characterBuilder.buildPrompt(
          chatId,
          prompt
        );

      // Generate Image
      const imageUrl =
        await imageManager.generate(
          finalPrompt
        );

      await bot.sendPhoto(
        chatId,
        imageUrl,
        {
          caption:
            "🎨 CartoonVerse AI\n\n✅ Character Consistency Enabled"
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
