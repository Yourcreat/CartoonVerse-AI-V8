const aiRouter = require("../services/aiRouter");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/movie (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🎬 Creating Professional Movie..."
      );

      const prompt = `
You are an Oscar-winning Pixar movie writer.

TOPIC:
${topic}

Create a complete movie.

Return in this format:

# Movie Title

# Hook

# Main Character

# Scene 1

Narration

Dialogue

Image Prompt

Video Prompt

Repeat until Scene 10.

Then return:

Ending

Moral

YouTube Title

YouTube Description

SEO Keywords

Style:
Pixar 3D
Disney Quality
Family Friendly
Cinematic

Length:
2000 words.
`;

      const movie =
        await aiRouter.generate(prompt);

      await sendLongMessage(
        bot,
        chatId,
        movie
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Movie Generation Failed."
      );

    }

  });

};
