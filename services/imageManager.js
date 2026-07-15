const replicate = require("./imageGenerator");
const together = require("./providers/together");
const pollinations = require("./providers/pollinations");

async function generate(prompt) {

  console.log("🎨 Starting Image Generation...");

  // ==========================
  // Replicate (Priority 1)
  // ==========================

  try {

    console.log("⚡ Trying Replicate...");

    const image =
      await replicate.generateImage(prompt);

    if (image) {

      console.log("✅ Replicate Success");

      return image;

    }

  } catch (err) {

    console.log("❌ Replicate Failed");
    console.log(err.message);

  }

  // ==========================
  // Together AI (Priority 2)
  // ==========================

  try {

    console.log("⚡ Trying Together AI...");

    const image =
      await together.generate(prompt);

    if (image) {

      console.log("✅ Together AI Success");

      return image;

    }

  } catch (err) {

    console.log("❌ Together AI Failed");
    console.log(err.message);

  }

  // ==========================
  // Pollinations (Priority 3)
  // ==========================

  try {

    console.log("⚡ Trying Pollinations...");

    const image =
      await pollinations.generate(prompt);

    if (image) {

      console.log("✅ Pollinations Success");

      return image;

    }

  } catch (err) {

    console.log("❌ Pollinations Failed");
    console.log(err.message);

  }

  throw new Error("All Image Providers Failed.");

}

module.exports = {
  generate
};
