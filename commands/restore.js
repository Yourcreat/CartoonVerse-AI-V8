const fs = require("fs");

module.exports = function (bot, database) {

  bot.onText(/\/restore$/, async (msg) => {

    const chatId = msg.chat.id;

    await bot.sendMessage(
      chatId,
      "📂 Send your Backup JSON file."
    );

  });

  bot.on("document", async (msg) => {

    const chatId = msg.chat.id;

    if (!msg.document) return;

    if (!msg.document.file_name.endsWith(".json")) return;

    try {

      await bot.sendMessage(
        chatId,
        "⚡ Restore feature is under development.\nBackup file received successfully."
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Restore Failed."
      );

    }

  });

};
