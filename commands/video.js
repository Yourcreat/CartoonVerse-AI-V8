module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/video (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    await bot.sendMessage(
      chatId,
      "🎥 Creating Video Prompts..."
    );

    try {

      const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: `
You are a professional cinematic AI video prompt engineer.

Topic:
${topic}

Create:

• Opening Shot
• Scene 1 Video Prompt
• Scene 2 Video Prompt
• Scene 3 Video Prompt
• Camera Movement
• Character Motion
• Lighting
• Color Style
• Final Render Style

Write only in English.

Optimized for Veo 3, Kling AI and LTX Studio.
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
        "❌ Video Prompt Generation Failed."
      );

    }

  });

};
