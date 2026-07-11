const router = require("../services/router");
const gemini = require("../services/gemini");
const memory = require("../utils/memory");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.on("message", async (msg) => {

    const chatId = msg.chat.id;

    if (!msg.text) return;

    // Ignore commands
    if (msg.text.startsWith("/")) return;

    const intent = router(msg.text);

    try {

      switch (intent) {

        case "story": {

          await bot.sendMessage(
            chatId,
            "📖 Creating Story..."
          );

          const prompt = `
Write a professional cinematic story.

Topic:
${msg.text}

Requirements:

- Powerful Title
- Hook
- Story
- Ending
- Moral

Length:
800-1000 words.

Language:
English.
`;

          const text = await gemini.generate(prompt);

          memory.set(chatId, {
            type: "story",
            topic: msg.text,
            content: text
          });

          await sendLongMessage(
            bot,
            chatId,
            text
          );

          break;
        }

        case "character": {

          await bot.sendMessage(
            chatId,
            "🎭 Creating Character..."
          );

          const prompt = `
Create a professional Pixar-style character.

Topic:
${msg.text}

Generate:

Name
Age
Appearance
Costume
Personality
Strength
Weakness
Backstory

Suitable for animated YouTube videos.
`;

          const characterText = await gemini.generate(prompt);

          memory.set(chatId, {
            type: "character",
            topic: msg.text,
            content: characterText
          });

          await sendLongMessage(
            bot,
            chatId,
            characterText
          );

          break;
        }

        case "scene": {

          await bot.sendMessage(
            chatId,
            "🎬 Creating Scene..."
          );

          const prompt = `
Create a cinematic Pixar-style storyboard scene.

Topic:
${msg.text}

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

Suitable for YouTube animated videos.
`;

          const sceneText = await gemini.generate(prompt);

          memory.set(chatId, {
            type: "scene",
            topic: msg.text,
            content: sceneText
          });

          await sendLongMessage(
            bot,
            chatId,
            sceneText
          );

          break;
        }

        case "voice":

          bot.sendMessage(
            chatId,
            "🎙 Voice Auto Mode Coming Soon..."
          );
          break;

        case "movieplus":

          bot.sendMessage(
            chatId,
            "🎥 Movie Auto Mode Coming Soon..."
          );
          break;

        default:

          bot.sendMessage(
            chatId,
            "🤖 I understood your message.\nTry:\n• Create football story\n• Create Chintu character\n• Create school scene"
          );

      }

    } catch (err) {

      console.error(err);

      bot.sendMessage(
        chatId,
        "❌ AI Generation Failed."
      );

    }

  });

};
