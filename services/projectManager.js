const projects = {};

function save(chatId, data) {
  projects[chatId] = data;
}

function get(chatId) {
  return projects[chatId] || null;
}

function update(chatId, newData) {

  if (!projects[chatId]) {
    projects[chatId] = {};
  }

  projects[chatId] = {
    ...projects[chatId],
    ...newData
  };

}

function clear(chatId) {
  delete projects[chatId];
}

function exists(chatId) {
  return !!projects[chatId];
}

module.exports = {
  save,
  get,
  update,
  clear,
  exists
};
