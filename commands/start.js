module.exports = function (bot) {

  bot.onText(/\/start/, async (msg) => {

    await bot.sendMessage(
      msg.chat.id,

`🎬 CartoonVerse AI V8

Welcome to CartoonVerse AI!

Use /help to see all available commands.

🚀 Ready to create amazing YouTube cartoon projects!`

    );

  });

};
