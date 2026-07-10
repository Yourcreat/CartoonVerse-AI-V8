module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/movieplus (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🎬 Creating AI Movie...\n⏳ This may take 30–60 seconds..."
      );

      const prompt = `
Create a complete Pixar-style animated movie package.

Topic:
${topic}

Generate:

🎬 Movie Title

📖 10–15 minute movie story

🎭 Character Bible
- Name
- Age
- Personality
- Appearance
- Costume

🎞 Create 50 scenes.

For EVERY scene provide:

Scene Number

Scene Description

Camera Angle

Character Action

Character Emotion

Background

Lighting

Image Prompt

Video Prompt (Veo / Kling / LTX)

Voice-over Script

Sound Effects

Background Music

Finally generate:

YouTube Title

Description

20 SEO Tags
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text;

      database.saveProject(chatId, {
        type: "movieplus",
        topic,
        content: text,
        createdAt: new Date().toISOString(),
      });

      await sendLongMessage(bot, chatId, text);

      await bot.sendMessage(
        chatId,
        "✅ AI Movie Generated Successfully!\n\nNow use:\n/pdf\n/zip"
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Movie generation failed."
      );

    }

  });

};
