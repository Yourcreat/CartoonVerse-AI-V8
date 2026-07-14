const aiRouter = require("../services/aiRouter");
module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/story (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    await bot.sendMessage(chatId, "📖 Creating Story...");

    try {

      const prompt = `
You are an award-winning Pixar and Disney screenwriter.

Create a complete cinematic story.

TOPIC:
${topic}

Requirements:

1. Catchy Title

2. Hook (5-10 seconds)

3. Main Character

4. Beginning

5. Conflict

6. Climax

7. Emotional Ending

8. Moral

Story Length:
900-1200 words.

Target Audience:
Kids (5-12)

Style:
Pixar 3D
Emotional
Funny
Family Friendly

Output in clean markdown.
`;
const text = await aiRouter.generate(prompt);

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
