const gemini = require("../services/gemini");
module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/voice (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🎙 Creating Professional Voice Script...\n⏳ Please wait..."
      );

      const prompt = `
Create a professional YouTube cartoon voice-over script.

Topic:
${topic}

Requirements:

- 4–5 minute narration
- Divide into 10 scenes
- For each scene provide:

Scene Number

Narration

Emotion (Happy, Sad, Angry, Excited, Calm, Scared)

Pause Timing

Voice Style

Speaking Speed

Sound Effects

Background Music Suggestion

The script must be suitable for ElevenLabs, Google TTS and Azure AI Voice.

Return clean markdown.
`;

      const text = await gemini.generate(prompt);

      database.saveProject(chatId, {
        type: "voice",
        topic,
        content: text,
        createdAt: new Date().toISOString(),
      });

      await sendLongMessage(bot, chatId, text);

      await bot.sendMessage(
        chatId,
        "✅ Voice Script Generated Successfully."
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Voice generation failed."
      );

    }

  });

};
