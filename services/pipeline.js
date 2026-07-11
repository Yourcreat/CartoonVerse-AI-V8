const projectManager = require("./projectManager");
const gemini = require("./gemini");

async function createMovie(chatId, topic) {

  const story = await gemini.generate(`
Write a professional cinematic story about:
${topic}
`);

  const character = await gemini.generate(`
Create a Pixar-style character for this story:

${story}
`);

  const scene = await gemini.generate(`
Create 10 cinematic storyboard scenes from this story:

${story}
`);

  const voice = await gemini.generate(`
Create a professional voice-over script from this story:

${story}
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
