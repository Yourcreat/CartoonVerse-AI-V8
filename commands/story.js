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

TOPIC:
${topic}

Create:

# Title

# Hook

# Main Character

# Beginning

# Conflict

# Climax

# Ending

# Moral

Story Length:
1000-1500 words.

Style:
Pixar
Disney
Family Friendly
Cinematic

Language:
English
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
