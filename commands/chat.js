const router = require("../services/router");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.on("message", async (msg) => {

    const chatId = msg.chat.id;

    if (!msg.text) return;

    // Ignore commands
    if (msg.text.startsWith("/")) return;

    const intent = router(msg.text);

    switch (intent) {

      case "story":
        bot.sendMessage(
          chatId,
          "📖 I understood you want a Story.\nPlease use:\n/story " + msg.text
        );
        break;

      case "character":
        bot.sendMessage(
          chatId,
          "🎭 I understood you want a Character.\nPlease use:\n/character " + msg.text
        );
        break;

      case "scene":
        bot.sendMessage(
          chatId,
          "🎬 I understood you want a Scene.\nPlease use:\n/scene " + msg.text
        );
        break;

      case "voice":
        bot.sendMessage(
          chatId,
          "🎙 I understood you want a Voice Script.\nPlease use:\n/voice " + msg.text
        );
        break;

      case "movieplus":
        bot.sendMessage(
          chatId,
          "🎥 I understood you want a Movie.\nPlease use:\n/movieplus " + msg.text
        );
        break;

      default:
        bot.sendMessage(
          chatId,
          "🤖 I understood your message, but I'm still learning.\nTry /help to see available commands."
        );

    }

  });

};
