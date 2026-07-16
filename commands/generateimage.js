const openAI = require("../services/openGenerativeAI");
const aiRouter = require("../services/aiRouter");

module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/generateimage (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const text = match[1];

    try {

      // AI Mode
      if (text.startsWith("ai ")) {

        const prompt = text.replace(/^ai /, "");

        await bot.sendMessage(chatId, "🖼 Creating AI Image...");

        const result = await openAI.generateImage(prompt);

        await bot.sendPhoto(chatId, result.image, {
          caption:
`✅ Image Generated

Provider: ${result.provider}

Model: ${result.model}

Prompt:
${prompt}`
        });

        return;
      }

      // Prompt Mode
      if (text.startsWith("prompt ")) {

        const topic = text.replace(/^prompt /, "");

        await bot.sendMessage(
          chatId,
          "🎨 Creating Professional Pixar Image Prompts..."
        );

        const prompt = `
Create EXACTLY 10 Pixar cinematic image prompts.

Topic:
${topic}
`;

        const result = await aiRouter.generate(prompt);

        await sendLongMessage(bot, chatId, result);

        return;
      }

      await bot.sendMessage(
        chatId,
        "Usage:\n/generateimage prompt cat\n/generateimage ai cat"
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Image Generation Failed.\n\n" + err.message
      );

    }

  });

};
