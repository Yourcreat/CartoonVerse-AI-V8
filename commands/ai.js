const pipeline = require("../services/pipeline");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/ai (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🎬 Starting AI Movie Pipeline..."
      );

      const project = await pipeline.createMovie(
        chatId,
        topic
      );

      await bot.sendMessage(chatId, "━━━━━━━━━━━━━━");
      await bot.sendMessage(chatId, "📖 STORY");
      await sendLongMessage(bot, chatId, project.story);

      await bot.sendMessage(chatId, "━━━━━━━━━━━━━━");
      await bot.sendMessage(chatId, "🎭 CHARACTER");
      await sendLongMessage(bot, chatId, project.character);

      await bot.sendMessage(chatId, "━━━━━━━━━━━━━━");
      await bot.sendMessage(chatId, "🎬 SCENES");
      await sendLongMessage(bot, chatId, project.scene);

      await bot.sendMessage(chatId, "━━━━━━━━━━━━━━");
      await bot.sendMessage(chatId, "🎙 VOICE SCRIPT");
      await sendLongMessage(bot, chatId, project.voice);

      await bot.sendMessage(
        chatId,
        "✅ AI Movie Package Completed!"
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ AI Pipeline Failed."
      );

    }

  });

};
