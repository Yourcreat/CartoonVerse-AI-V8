const gemini = require("../services/gemini");
module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/story (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    await bot.sendMessage(chatId, "📖 Creating Story...");

    try {

      const prompt = `
Write a professional cinematic story.

Topic:
${topic}

Requirements:
- Powerful Title
- Hook
- Story
- Ending
- Moral

Length:
800-1000 words.

Language:
English.
`;

const text = await gemini.generate(prompt);

await sendLongMessage(
  bot,
  chatId,
  text
);
    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Story Generation Failed."
      );

    }

  });

};
