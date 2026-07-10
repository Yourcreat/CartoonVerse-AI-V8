module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/create (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🚀 CartoonVerse AI\n\nCreating Complete Production Package...\n⏳ Please wait..."
      );

      const prompt = `
You are a professional Pixar Animation Studio AI.

Create a COMPLETE YouTube production package.

Topic:
${topic}

Generate in this order:

# 1 Story Title

# 2 Full Story (4–5 minutes)

# 3 Character Profile

Name

Age

Appearance

Costume

Personality

# 4 Storyboard (10 Scenes)

Each scene must include:

Scene Number

Scene Description

Camera Angle

Character Action

Emotion

Background

Lighting

Image Prompt

Video Prompt

# 5 Voice Script

Scene-wise narration

Emotion

Pause Timing

Voice Style

Sound Effects

Music

# 6 YouTube Package

Title

Description

20 SEO Tags

Return clean markdown.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text;

      database.saveProject(chatId, {
        type: "create",
        topic,
        content: text,
        createdAt: new Date().toISOString(),
      });

      await sendLongMessage(bot, chatId, text);

      await bot.sendMessage(
        chatId,
        "✅ Production Package Ready!\n\nNow use:\n/pdf\n/zip"
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Create command failed."
      );

    }

  });

};
