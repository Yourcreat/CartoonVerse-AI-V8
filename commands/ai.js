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

      await sendLongMessage(
        bot,
        chatId,
        `📖 STORY\n\n${project.story}`
      );

      await sendLongMessage(
        bot,
        chatId,
        `🎭 CHARACTER\n\n${project.character}`
      );

      await sendLongMessage(
        bot,
        chatId,
        `🎬 SCENES\n\n${project.scene}`
      );

      await sendLongMessage(
        bot,
        chatId,
        `🎙 VOICE\n\n${project.voice}`
      );

      await bot.sendMessage(
        chatId,
        "✅ AI Movie Project Completed!"
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
