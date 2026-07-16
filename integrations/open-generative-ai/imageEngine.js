const config = require("./config");

async function generateImage(prompt) {

  console.log("🖼 Image Engine Started");

  return {
    success: true,

    provider: config.IMAGE_PROVIDER,

    model: config.DEFAULT_IMAGE_MODEL,

    prompt,

    message: "Image Engine Ready"
  };

}

module.exports = {
  generateImage
};
