const aiRouter = require("../services/aiRouter");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/project (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🚀 Building Professional Project..."
      );

      const prompt = `
You are CartoonVerse AI Producer.

Create a COMPLETE YouTube Cartoon Project.

TOPIC:
${topic}

Return in this format:

# Project Title

# Story Summary

# Main Character

# Character Design

# Character Personality

# Art Style

# Color Palette

# Scene List (10 Scenes)

# Thumbnail Idea

# YouTube Title

# YouTube Description

# SEO Keywords

Style:
Pixar 3D
Disney Quality
Family Friendly
Professional
`;

      const project =
        await aiRouter.generate(prompt);

      database.saveProject(chatId, {
        topic,
        createdAt: new Date().toISOString(),
        project
      });

      await sendLongMessage(
        bot,
        chatId,
        project
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Project Generation Failed."
      );

    }

  });

};
