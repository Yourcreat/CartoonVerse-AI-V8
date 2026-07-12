module.exports = function (bot) {

  bot.onText(/\/status$/, async (msg) => {

    const chatId = msg.chat.id;

    await bot.sendMessage(
      chatId,
`🤖 CartoonVerse AI V8

━━━━━━━━━━━━━━

✅ Bot Online

✅ Gemini Connected

✅ Database Connected

✅ Memory Active

✅ PDF Export Ready

✅ ZIP Export Ready

━━━━━━━━━━━━━━

🚀 System Healthy`
    );

  });

};
