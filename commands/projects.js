module.exports = function (bot, database) {

  bot.onText(/\/projects$/, async (msg) => {

    const chatId = msg.chat.id;

    try {

      const projects = database.getProjects(chatId);

      if (!projects || projects.length === 0) {
        return bot.sendMessage(
          chatId,
          "📂 No saved projects found."
        );
      }

      let text = "📂 Your Saved Projects\n\n";

      projects.forEach((project, index) => {
        text += `${index + 1}. ${project.topic}\n`;
      });

      await bot.sendMessage(chatId, text);

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Failed to load projects."
      );

    }

  });

};
