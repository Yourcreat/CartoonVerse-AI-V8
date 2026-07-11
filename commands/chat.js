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

    switch (intent) {

      case "story":

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
  content: text,
  topic: msg.text
});
        memory.set(chatId, {
  type: "character",
  content: characterText,
  topic: msg.text
});
        memory.set(chatId, {
  type: "scene",
  content: sceneText,
  topic: msg.text
});
  await sendLongMessage(
    bot,
    chatId,
    text
  );

  break;

      case "character":

  await bot.sendMessage(
    chatId,
    "🎭 Creating Character..."
  );

  const characterPrompt = `
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

  const characterText = await gemini.generate(characterPrompt);

  await sendLongMessage(
    bot,
    chatId,
    characterText
  );

  break;

      case "scene":

  await bot.sendMessage(
    chatId,
    "🎬 Creating Scene..."
  );

  const scenePrompt = `
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

  const sceneText = await gemini.generate(scenePrompt);

  await sendLongMessage(
    bot,
    chatId,
    sceneText
  );

  break;

      case "voice":
        bot.sendMessage(
          chatId,
          "🎙 I understood you want a Voice Script.\nPlease use:\n/voice " + msg.text
        );
        break;

      case "movieplus":
        bot.sendMessage(
          chatId,
          "🎥 I understood you want a Movie.\nPlease use:\n/movieplus " + msg.text
        );
        break;

      default:
        bot.sendMessage(
          chatId,
          "🤖 I understood your message, but I'm still learning.\nTry /help to see available commands."
        );

    }

  });

};
