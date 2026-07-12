const fs = require("fs");
const path = require("path");

module.exports = function (bot, database) {

  bot.onText(/\/backup$/, async (msg) => {

    const chatId = msg.chat.id;

    try {

      const projects = database.getProjects(chatId);

      if (!projects || projects.length === 0) {

        return bot.sendMessage(
          chatId,
          "❌ No saved projects found."
        );

      }

      const backupPath = path.join(
        __dirname,
        "../temp/zip",
        `Backup_${chatId}.json`
      );

      fs.writeFileSync(
        backupPath,
        JSON.stringify(projects, null, 2)
      );

      await bot.sendDocument(
        chatId,
        backupPath,
        {
          caption: "💾 CartoonVerse Backup"
        }
      );

      setTimeout(() => {

        if (fs.existsSync(backupPath)) {

          fs.unlinkSync(backupPath);

          console.log("🗑 Backup Deleted");

        }

      }, 60 * 60 * 1000);

    } catch (err) {

      console.error(err);

      bot.sendMessage(
        chatId,
        "❌ Backup Failed."
      );

    }

  });

};
