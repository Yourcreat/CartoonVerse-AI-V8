const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../database/characters.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return {};
  }
}

function save(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function setCharacter(chatId, character) {
  const data = load();
  data[chatId] = character;
  save(data);
}

function getCharacter(chatId) {
  const data = load();
  return data[chatId] || null;
}

module.exports = {
  setCharacter,
  getCharacter
};
