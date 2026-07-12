const axios = require("axios");

async function generateImage(prompt) {

  const url =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt);

  return url;

}

module.exports = {
  generateImage
};
