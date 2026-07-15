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
`🎬 CartoonVerse AI Studio V12

━━━━━━━━━━━━━━━━━━

🚀 Creating Full Production Package...

📝 Story
🎭 Character
🎬 Scenes
🎙 Voice
🖼 Image Prompts
🎥 Video Prompts

Please wait...

━━━━━━━━━━━━━━━━━━`
      );

      const project =
        await pipeline.createMovie(chatId, topic);

      // STORY
      await bot.sendMessage(chatId, "📖 STORY");
      await sendLongMessage(bot, chatId, project.story);

      // CHARACTER
      await bot.sendMessage(chatId, "🎭 CHARACTER");
      await sendLongMessage(bot, chatId, project.character);

      // SCENES
      await bot.sendMessage(chatId, "🎬 SCENES");
      await sendLongMessage(bot, chatId, project.scene);

      // VOICE
      if (project.voice) {
        await bot.sendMessage(chatId, "🎙 VOICE SCRIPT");
        await sendLongMessage(bot, chatId, project.voice);
      }

      // IMAGE PROMPTS
      if (project.imagePrompts) {
        await bot.sendMessage(chatId, "🖼 IMAGE PROMPTS");
        await sendLongMessage(bot, chatId, project.imagePrompts);
      }

      // VIDEO PROMPTS
      if (project.videoPrompts) {
        await bot.sendMessage(chatId, "🎥 VIDEO PROMPTS");
        await sendLongMessage(bot, chatId, project.videoPrompts);
      }

      await bot.sendMessage(
        chatId,
`✅ CartoonVerse AI Studio Completed

📂 Project:
${topic}

Available Commands:

/story ${topic}
/movie ${topic}
/project ${topic}
/image ${topic}

🎉 Production Package Ready!`
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Studio Generation Failed."
      );

    }

  });

};
