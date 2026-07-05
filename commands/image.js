module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/image (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    await bot.sendMessage(
      chatId,
      "🖼️ Creating Image Prompts..."
    );

    try {

      const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: `
You are a professional Pixar concept artist.

Topic:
${topic}

Generate:

• Character Sheet
• Environment Prompt
• Scene 1 Prompt
• Scene 2 Prompt
• Scene 3 Prompt
• Lighting Style
• Camera Style

All prompts must be cinematic, ultra detailed and English only.
`

      });

      await sendLongMessage(
        bot,
        chatId,
        response.text
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Image Prompt Generation Failed."
      );

    }

  });

};
