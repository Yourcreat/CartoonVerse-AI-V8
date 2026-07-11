const projectManager = require("./projectManager");
const gemini = require("./gemini");

async function createMovie(chatId, topic) {

  const story = await gemini.generate(`
Write a cinematic story about:
${topic}
`);

  const character = await gemini.generate(`
Create Pixar character for:
${topic}
`);

  const scene = await gemini.generate(`
Create storyboard scenes for:
${topic}
`);

  const voice = await gemini.generate(`
Create voice script for:
${topic}
`);

  const project = {
    topic,
    story,
    character,
    scene,
    voice,
    createdAt: new Date().toISOString()
  };

  projectManager.save(chatId, project);

  return project;

}

module.exports = {
  createMovie
};
