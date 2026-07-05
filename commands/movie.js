module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/movie (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    await bot.sendMessage(
      chatId,
      "🎬 Creating Movie Script..."
    );

    try {

      const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: `
You are a professional Pixar movie script writer.

Topic:
${topic}

Create:

• Movie Title
• Opening Scene
• Scene 1–10
• Dialogues
• Narration
• Ending
• Moral

Length:
1500–2000 words.

Language:
English.
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
        "❌ Movie Script Generation Failed."
      );

    }

  });

};
