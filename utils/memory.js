const memory = {};

module.exports = {

  set(chatId, data) {
    memory[chatId] = data;
  },

  get(chatId) {
    return memory[chatId] || null;
  },

  clear(chatId) {
    delete memory[chatId];
  }

};
