module.exports = function (bot, database) {

  bot.onText(/\/save$/, async (msg) => {

    const chatId = msg.chat.id;

    try {

      const projects = database.getProjects(chatId);

      if (!projects || projects.length === 0) {
        return bot.sendMessage(
          chatId,
          "❌ No project found to save."
        );
      }

      const latestProject = projects[projects.length - 1];

      database.saveProject(chatId, latestProject);

      await bot.sendMessage(
        chatId,
        "✅ Latest project saved successfully."
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Save failed."
      );

    }

  });

};
