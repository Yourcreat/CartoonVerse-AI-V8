const videoRouter = require("../services/videoRouter");

module.exports = {
  callback: async ({ bot, msg, args }) => {
    const chatId = msg.chat.id;
    const prompt = args.join(" ");

    if (!prompt) {
      return bot.sendMessage(
        chatId,
        "❌ Usage:\n/generatevideo your prompt"
      );
    }

    await bot.sendMessage(chatId, "🎥 Generating AI Video...");

    const result = await videoRouter.generateVideo(prompt);

    if (!result.success) {
      return bot.sendMessage(chatId, `⚠️ ${result.message}`);
    }

    return bot.sendMessage(
      chatId,
      `✅ Video Generated

Provider: ${result.provider}
Model: ${result.model}

${result.video}`
    );
  }
};
