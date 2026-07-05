const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data/projects");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getProjectFile(chatId) {
  return path.join(DATA_DIR, `${chatId}.json`);
}

function saveProject(chatId, data) {
  fs.writeFileSync(
    getProjectFile(chatId),
    JSON.stringify(data, null, 2)
  );
}

function loadProject(chatId) {
  const file = getProjectFile(chatId);

  if (!fs.existsSync(file)) {
    return null;
  }

  return JSON.parse(
    fs.readFileSync(file, "utf8")
  );
}

module.exports = {
  saveProject,
  loadProject
};
