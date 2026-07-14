const pipeline = require("../services/pipeline");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/studio (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        `🎬 CartoonVerse AI Studio

━━━━━━━━━━━━━━━━━━
🚀 Starting Production...
━━━━━━━━━━━━━━━━━━

📝 Story
🎭 Character
🎬 Scenes
🎨 Images
🎥 Videos
🎙 Voice
📦 Project

Please wait...`
      );

      const project =
        await pipeline.createMovie(
          chatId,
          topic
        );

      await bot.sendMessage(
        chatId,
        "📖 STORY"
      );

      await sendLongMessage(
        bot,
        chatId,
        project.story
      );

      await bot.sendMessage(
        chatId,
        "🎭 CHARACTER"
      );

      await sendLongMessage(
        bot,
        chatId,
        project.character
      );

      await bot.sendMessage(
        chatId,
        "🎬 SCENES"
      );

      await sendLongMessage(
        bot,
        chatId,
        project.scene
      );

      if (project.voice) {

        await bot.sendMessage(
          chatId,
          "🎙 VOICE SCRIPT"
        );

        await sendLongMessage(
          bot,
          chatId,
          project.voice
        );

      }

      await bot.sendMessage(
        chatId,
        `✅ CartoonVerse AI Studio Finished

Project:
${topic}

Next Commands:

/image ${topic}

/movie ${topic}

/project ${topic}`
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Studio Failed."
      );

    }

  });

};
