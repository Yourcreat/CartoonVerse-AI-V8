const { fal } = require("@fal-ai/client");

// Fal AI Configuration
fal.config({
  credentials: process.env.FAL_KEY || process.env.FAL_API_KEY,
});

async function generateImage(prompt) {

  try {

    const result = await fal.subscribe(
      "fal-ai/flux/dev",
      {
        input: {
          prompt: prompt,
          image_size: "landscape_16_9",
          num_images: 1
        }
      }
    );

    if (
      result &&
      result.data &&
      result.data.images &&
      result.data.images.length > 0
    ) {

      return result.data.images[0].url;

    }

    throw new Error("No image returned.");

  } catch (err) {

    console.error("FLUX ERROR:", err);

    throw err;

  }

}

module.exports = {
  generateImage
};
