module.exports = function (bot, database) {

  bot.onText(/\/stats$/, async (msg) => {

    const chatId = msg.chat.id;

    try {

      const projects = database.getProjects(chatId) || [];

      await bot.sendMessage(
        chatId,
`📊 CartoonVerse AI Stats

━━━━━━━━━━━━━━

📁 Projects : ${projects.length}

🤖 Bot Status : Online

━━━━━━━━━━━━━━

✅ Everything Working Perfectly`
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Unable to load stats."
      );

    }

  });

};
