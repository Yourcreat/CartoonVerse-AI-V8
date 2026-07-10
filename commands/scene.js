const gemini = require("../services/gemini");
module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/scene (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      const prompt = `
Create a cinematic storyboard scene.

Topic:
${topic}

Generate:

🎬 Scene Title

📖 Scene Description

🎥 Camera Angle

🎭 Character Action

😀 Character Emotion

🌄 Background

💡 Lighting

🖼 Image Prompt

🎞 Video Prompt

Make it suitable for Pixar-style animated YouTube videos.
`;

      const text = await gemini.generate(prompt);

      database.saveProject(chatId, {
        type: "scene",
        topic,
        content: text,
        createdAt: new Date().toISOString(),
      });

      await sendLongMessage(bot, chatId, text);

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Scene generation failed."
      );

    }

  });

};
