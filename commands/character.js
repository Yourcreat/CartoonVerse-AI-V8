module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/character (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      const prompt = `
Create a detailed cartoon character profile.

Topic: ${topic}

Include:

Name
Age
Gender
Appearance
Hair
Outfit
Personality
Powers
Weakness
Speaking Style
Art Style

Make it suitable for animated YouTube videos.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text;

      database.saveProject(chatId, {
        type: "character",
        topic,
        content: text,
        createdAt: new Date().toISOString(),
      });

      await sendLongMessage(bot, chatId, text);

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Character generation failed."
      );

    }

  });

};
