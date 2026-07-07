module.exports = function (bot, database) {

  bot.onText(/\/delete (\d+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const index = parseInt(match[1]) - 1;

    try {

      const projects = database.getProjects(chatId);

      if (projects.length === 0) {
        return bot.sendMessage(
          chatId,
          "📂 No saved projects found."
        );
      }

      if (index < 0 || index >= projects.length) {
        return bot.sendMessage(
          chatId,
          "❌ Invalid project number."
        );
      }

      projects.splice(index, 1);

      database.overwriteProjects(chatId, projects);

      await bot.sendMessage(
        chatId,
        "✅ Project deleted successfully."
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Delete failed."
      );

    }

  });

};
