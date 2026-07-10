module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/episode (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🎬 Creating Complete Episode...\n⏳ Please wait..."
      );

      const prompt = `
Create a complete YouTube Pixar cartoon package.

Topic:
${topic}

Generate in this order:

1. Story Title

2. Full Story (4–5 min)

3. Character Profile

4. 10 Scene Storyboard

For every scene include:

- Scene Number
- Scene Description
- Camera Angle
- Character Action
- Character Emotion
- Background
- Lighting
- Image Prompt
- Video Prompt

Then generate:

• YouTube Title
• YouTube Description
• 20 SEO Tags

Output in clean markdown.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text;

      database.saveProject(chatId, {
        type: "episode",
        topic,
        content: text,
        createdAt: new Date().toISOString(),
      });

      await sendLongMessage(bot, chatId, text);

      await bot.sendMessage(
        chatId,
        "✅ Episode completed.\n\nNow you can use:\n/pdf\n/zip"
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Episode generation failed."
      );

    }

  });

};
