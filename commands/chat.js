const router = require("../services/router");
const gemini = require("../services/gemini");
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

  await bot.sendMessage(
    chatId,
    "📖 Creating Story..."
  );

  const prompt = `
Write a professional cinematic story.

Topic:
${msg.text}

Requirements:

- Powerful Title
- Hook
- Story
- Ending
- Moral

Length:
800-1000 words.

Language:
English.
`;

  const text = await gemini.generate(prompt);

  await sendLongMessage(
    bot,
    chatId,
    text
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
