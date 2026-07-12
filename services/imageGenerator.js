const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function generateImage(prompt) {

  try {

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt
        }
      }
    );

    if (!output || output.length === 0) {
      throw new Error("No image returned.");
    }

    return output[0];

  } catch (err) {

    console.error("Replicate Error:", err);

    throw err;

  }

}

module.exports = {
  generateImage
};
