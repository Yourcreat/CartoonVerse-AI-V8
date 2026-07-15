module.exports = async function sendLongMessage(bot, chatId, text) {

  if (!text) return;

  const LIMIT = 3500;

  while (text.length > LIMIT) {

    let splitIndex = text.lastIndexOf("\n", LIMIT);

    if (splitIndex === -1) {
      splitIndex = LIMIT;
    }

    const part = text.substring(0, splitIndex);

    await bot.sendMessage(chatId, part);

    text = text.substring(splitIndex).trim();

  }

  if (text.length > 0) {
    await bot.sendMessage(chatId, text);
  }

};
