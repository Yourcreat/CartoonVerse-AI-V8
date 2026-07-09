const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

module.exports = function (bot, database) {

  bot.onText(/\/zip$/, async (msg) => {

    const chatId = msg.chat.id;

    try {

      const projects = database.getProjects(chatId);

      if (!projects || projects.length === 0) {
        return bot.sendMessage(
          chatId,
          "❌ No saved project found."
        );
      }

      const zipPath = path.join(
        __dirname,
        `../CartoonVerse_${chatId}.zip`
      );

      const output = fs.createWriteStream(zipPath);

      const archive = archiver("zip", {
        zlib: { level: 9 }
      });

      archive.pipe(output);

      archive.append(
        JSON.stringify(projects, null, 2),
        {
          name: "projects.json"
        }
      );

      await archive.finalize();

      output.on("close", async () => {

        await bot.sendDocument(
          chatId,
          zipPath,
          {
            caption: "📦 CartoonVerse Project ZIP"
          }
        );

        fs.unlinkSync(zipPath);

      });

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ ZIP export failed."
      );

    }

  });

};
