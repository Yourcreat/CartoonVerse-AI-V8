const aiRouter = require("../services/aiRouter");
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
          await aiRouter.generate(prompt);
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
