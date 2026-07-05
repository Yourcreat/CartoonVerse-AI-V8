module.exports = async function sendLongMessage(bot, chatId, text) {

  if (!text) return;

  const LIMIT = 4000;

  if (text.length <= LIMIT) {
    return bot.sendMessage(chatId, text);
  }

  for (let i = 0; i < text.length; i += LIMIT) {
    await bot.sendMessage(
      chatId,
      text.substring(i, i + LIMIT)
    );
  }

};
