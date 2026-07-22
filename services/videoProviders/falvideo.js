const fal = require("@fal-ai/client");

async function generateVideo(prompt) {
  try {

    const result = await fal.subscribe(
      "fal-ai/ltx-video-v095",
      {
        input: {
          prompt: prompt
        }
      }
    );

    return {
      success: true,
      provider: "FAL AI",
      model: "LTX Video",
      video: result.data.video.url
    };

  } catch (err) {

    return {
      success: false,
      provider: "FAL AI",
      model: "LTX Video",
      message: err.message
    };

  }
}

module.exports = {
  generateVideo
};

async function generateVideo(prompt) {

  const result = await fal.subscribe("fal-ai/ltx-video-v097", {
    input: {
      prompt: prompt
    }
  });

  return {
    success: true,
    provider: "Fal AI",
    model: "LTX-Video",
    video: result.data.video.url
  };

}

module.exports = {
  generateVideo
};
