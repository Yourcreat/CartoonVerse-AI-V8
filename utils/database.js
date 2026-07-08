const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data/projects");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getProjectFile(chatId) {
  return path.join(DATA_DIR, `${chatId}.json`);
}

function saveProject(chatId, project) {

  let projects = [];

  if (fs.existsSync(getProjectFile(chatId))) {
    projects = JSON.parse(
      fs.readFileSync(getProjectFile(chatId), "utf8")
    );
  }

  if (!Array.isArray(projects)) {
    projects = [];
  }

  projects.push(project);

  fs.writeFileSync(
    getProjectFile(chatId),
    JSON.stringify(projects, null, 2)
  );
}

function getProjects(chatId) {

  const file = getProjectFile(chatId);

  if (!fs.existsSync(file)) {
    return [];
  }

  const data = JSON.parse(
    fs.readFileSync(file, "utf8")
  );

  return Array.isArray(data) ? data : [];
}
function overwriteProjects(chatId, projects) {

  fs.writeFileSync(
    getProjectFile(chatId),
    JSON.stringify(projects, null, 2)
  );

}
module.exports = {
  saveProject,
  getProjects,
  overwriteProjects
};
