module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/storyboard (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      const prompt = `
Create a professional animated storyboard.

Topic:
${topic}

Generate exactly 10 scenes.

For EACH scene include:

🎬 Scene Number
📖 Scene Description
🎥 Camera Angle
🎭 Character Action
😀 Emotion
🌄 Background
💡 Lighting
🖼 Image Prompt
🎞 Video Prompt

Style:
Pixar 3D Animated
Cinematic
Consistent Character
YouTube Quality
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text;

      database.saveProject(chatId, {
        type: "storyboard",
        topic,
        content: text,
        createdAt: new Date().toISOString(),
      });

      await sendLongMessage(bot, chatId, text);

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Storyboard generation failed."
      );

    }

  });

};
