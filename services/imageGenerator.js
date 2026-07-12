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
          prompt: prompt,
          aspect_ratio: "16:9",
          num_outputs: 1,
          output_format: "png",
          output_quality: 100,
          go_fast: true
        }
      }
    );

    if (!output || output.length === 0) {
      throw new Error("No image generated.");
    }

    // Replicate SDK returns file objects/URLs.
    const first = output[0];

    if (typeof first === "string") {
      return first;
    }

    if (first && typeof first.url === "function") {
      return first.url();
    }

    throw new Error("Unsupported output format.");

  } catch (err) {

    console.error("Replicate Error:", err);

    throw err;

  }

}

module.exports = {
  generateImage
};
