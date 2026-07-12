const gemini = require("../services/gemini");

module.exports = function (
  bot,
  ai,
  sendLongMessage,
  database
) {

  bot.onText(/\/generateimage (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const topic = match[1];

    try {

      await bot.sendMessage(
        chatId,
        "🖼 Creating Professional Image Prompt..."
      );

      const prompt = `
Create ONE ultra-detailed AI image prompt.

Topic:
${topic}

Requirements:

• Pixar 3D Style
• Cinematic Composition
• 8K
• Ultra Detailed
• Vibrant Colors
• Professional Lighting
• Consistent Character Design
• High Quality
• Suitable for Veo, Imagen, Midjourney, Flux and SDXL.

Return ONLY the final image prompt.
`;

      const imagePrompt = await gemini.generate(prompt);

      database.saveProject(chatId, {
        type: "imageprompt",
        topic,
        content: imagePrompt,
        createdAt: new Date().toISOString(),
      });

      await sendLongMessage(
        bot,
        chatId,
        imagePrompt
      );

      await bot.sendMessage(
        chatId,
        "✅ Image Prompt Ready!"
      );

    } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ Image Prompt Generation Failed."
      );

    }

  });

};
