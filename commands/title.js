module.exports = function (bot, ai, sendLongMessage) {

  bot.onText(/\/title (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    await bot.sendMessage(
      chatId,
      "🏷️ Creating YouTube Titles..."
    );

    try {

      const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: `
Generate 20 viral YouTube titles.

Topic:
${topic}

Requirements:

• High CTR
• Short
• Emotional
• Curiosity
• English only.
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
        "❌ Title Generation Failed."
      );

    }

  });

};
