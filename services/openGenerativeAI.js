const oga = require("../integrations/open-generative-ai");

async function generateImage(prompt) {
  return await oga.imageEngine.generateImage(prompt);
}

async function generateVideo(prompt) {
  return await oga.videoEngine.generateVideo(prompt);
}

module.exports = {
  generateImage,
  generateVideo
};
