const { fal } = require("@fal-ai/client");

fal.config({
  credentials: process.env.FAL_KEY,
});

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
