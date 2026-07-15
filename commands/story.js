const aiRouter = require("../services/aiRouter");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/story (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "📖 Creating Professional Story..."
      );

      const prompt = `
You are an award-winning Pixar and Disney screenwriter.

Create a complete cinematic story.

TOPIC:
${topic}

Return in this EXACT format:

# 🎬 Title

# 🎯 Hook

# 👦 Main Character

# 🌅 Beginning

# ⚔ Conflict

# 🔥 Climax

# 🎉 Ending

# 💡 Moral

Requirements:

- Pixar Style
- Disney Style
- Emotional
- Family Friendly
- Cinematic
- Strong Dialogues
- Professional Narration
- 1000-1200 words
- English only

Do NOT add anything outside these sections.
`;

      const story =
        await aiRouter.generate(prompt);

      await sendLongMessage(
        bot,
        chatId,
        story
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
