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
You are an Oscar-winning Pixar + Disney movie writer.

TOPIC:
${topic}

Create a COMPLETE production-ready movie.

Return ONLY in this format:

# 🎬 Movie Title

# 🎯 Hook

# 👦 Main Character

For EVERY Scene (1-10):

## Scene 1
Narration
Dialogue
Image Prompt
Video Prompt

## Scene 2
Narration
Dialogue
Image Prompt
Video Prompt

...

## Scene 10
Narration
Dialogue
Image Prompt
Video Prompt

Finally return:

# 🎉 Ending

# 💡 Moral

# 📺 YouTube Title

# 📝 YouTube Description

# 🔍 SEO Keywords

Requirements:

- Pixar 3D Style
- Disney Quality
- Family Friendly
- Cinematic
- Emotional
- Viral YouTube Quality
- Consistent Character
- English Only

Length:
1800–2200 words.

Do NOT add any extra explanation.
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
