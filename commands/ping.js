module.exports = function (bot) {

  bot.onText(/\/ping$/, async (msg) => {

    const chatId = msg.chat.id;

    const start = Date.now();

    const sent = await bot.sendMessage(
      chatId,
      "🏓 Pinging..."
    );

    const end = Date.now();

    const latency = end - start;

    await bot.editMessageText(

`🏓 Pong!

⚡ Response Time: ${latency} ms

✅ CartoonVerse AI is running perfectly.`,

      {
        chat_id: chatId,
        message_id: sent.message_id
      }

    );

  });

};
