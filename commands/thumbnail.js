module.exports = function (bot, ai, sendLongMessage) {

  bot.onText(/\/thumbnail (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    await bot.sendMessage(
      chatId,
      "🖼️ Creating Thumbnail Prompt..."
    );

    try {

      const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: `
You are a professional YouTube thumbnail designer.

Topic:
${topic}

Create one ultra detailed thumbnail prompt.

Requirements:

• Pixar Style
• Cinematic Lighting
• Bright Colors
• Emotional Expression
• High CTR
• 16:9 Composition

Language:
English only.
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
        "❌ Thumbnail Prompt Generation Failed."
      );

    }

  });

};
