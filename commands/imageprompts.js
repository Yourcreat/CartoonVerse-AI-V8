const gemini = require("../services/gemini");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/imageprompts (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🖼 Generating Image Prompts..."
      );

      const prompt = `
Create 10 cinematic Pixar-style image prompts.

Topic:
${topic}

For every scene generate:

Scene Number

Image Prompt

Keep every prompt highly detailed.

Use:
Pixar 3D animation,
cinematic lighting,
8K,
high quality,
consistent characters,
vibrant colors.
`;

      const result = await gemini.generate(prompt);

      await sendLongMessage(
        bot,
        chatId,
        result
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Image Prompt Generation Failed."
      );

    }

  });

};
