module.exports = function (bot, database) {

  bot.onText(/\/pdf$/, async (msg) => {

    const chatId = msg.chat.id;

    try {

      const projects = database.getProjects(chatId);

      if (!projects || projects.length === 0) {
        return bot.sendMessage(
          chatId,
          "❌ No saved project found."
        );
      }

      let text = "📄 CartoonVerse AI Export\n\n";

      projects.forEach((project, index) => {

        text += `====================\n`;
        text += `Project ${index + 1}\n`;
        text += `Type: ${project.type}\n`;
        text += `Topic: ${project.topic}\n\n`;
        text += `${project.content}\n\n`;

      });

      await bot.sendDocument(
        chatId,
        Buffer.from(text, "utf8"),
        {},
        {
          filename: "CartoonVerse_Project.txt",
          contentType: "text/plain"
        }
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Export failed."
      );

    }

  });

};
