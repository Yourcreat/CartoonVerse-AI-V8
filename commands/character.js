const aiRouter = require("../services/aiRouter");
const memory = require("../services/characterMemory");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/character (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🎭 Creating Professional Character..."
      );

      const prompt = `
You are the world's best Pixar Character Designer.

Create ONE professional character.

TOPIC:
${topic}

Rules:

- Character must be unique.
- Same face forever.
- Same hairstyle forever.
- Same clothes forever.
- Same shoes forever.
- Same body forever.
- Same colors forever.

Return:

Name:
Age:
Gender:
Face Shape:
Hair:
Eyes:
Eyebrows:
Nose:
Mouth:
Skin Tone:
Height:
Body Type:
Outfit:
Shoes:
Accessories:
Personality:
Voice:
Special Features:

Everything must remain exactly the same in every future image.
`;

      const character =
        await aiRouter.generate(prompt);

      memory.setCharacter(
        chatId,
        character
      );

      await bot.sendMessage(
        chatId,
        "✅ Character Saved Successfully!\n\n" +
        character
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Character Creation Failed."
      );

    }

  });

};
