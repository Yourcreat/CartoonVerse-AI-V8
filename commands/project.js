module.exports = function (bot, ai, sendLongMessage, database) {

  bot.onText(/\/project (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    await bot.sendMessage(
      chatId,
      "🚀 Creating Complete Project..."
    );

    try {

      const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: `
You are a professional YouTube Cartoon Content Creator.

Create a complete production-ready project.

Topic:
${topic}

Return:

1. Project Title
2. Story Summary
3. Main Character
4. Character Description
5. Character Style
6. Scene List (10 Scenes)
7. Thumbnail Idea
8. YouTube Title
9. YouTube Description
10. SEO Keywords

Language:
English.
`

      });

      const project = {
        topic,
        createdAt: new Date().toISOString(),
        project: response.text
      };

      database.saveProject(chatId, project);

      await sendLongMessage(
        bot,
        chatId,
        response.text
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
