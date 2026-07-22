const fal = require("@fal-ai/client");

fal.config({
  credentials: process.env.FAL_KEY
});

async function generateVideo(prompt) {
  try {

    const result = await fal.subscribe(
      "fal-ai/ltx-video-v097",
      {
        input: {
          prompt
        }
      }
    );

    return {
      success: true,
      provider: "FAL AI",
      model: "LTX-Video",
      video: result.data.video.url
    };

  } catch (err) {

    return {
      success: false,
      provider: "FAL AI",
      model: "LTX-Video",
      message: err.message
    };

  }
}

module.exports = {
  generateVideo
};
