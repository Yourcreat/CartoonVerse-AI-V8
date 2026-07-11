const gemini = require("../services/gemini");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/videoprompts (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🎥 Generating Video Prompts..."
      );

      const prompt = `
Create 10 cinematic AI video prompts.

Topic:
${topic}

For every scene generate:

Scene Number

Video Prompt

Use:

Pixar 3D Animation

Cinematic Camera

Smooth Motion

Character Animation

Professional Lighting

4K

Highly Detailed

Suitable for Veo 3, Seedance, Runway, Kling and Pika AI.
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
        "❌ Video Prompt Generation Failed."
      );

    }

  });

};
