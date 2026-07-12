const gemini = require("../services/gemini");
const memory = require("../services/characterMemory");

module.exports = function (bot) {

  bot.onText(/\/character (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🎭 Creating Character..."
      );

      const character =
        await gemini.generate(`

You are Pixar Character Designer.

Create ONE unique character.

Topic:
${topic}

Return:

Name

Age

Face Shape

Hair

Eyes

Eyebrows

Skin Tone

Height

Body

Costume

Shoes

Accessories

Personality

Voice

Special Features

Everything must stay EXACTLY SAME forever.

`);

      memory.setCharacter(chatId, character);

      await bot.sendMessage(
        chatId,
        "✅ Character Saved!\n\n" + character
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
