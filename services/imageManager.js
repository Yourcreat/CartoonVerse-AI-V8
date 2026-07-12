const replicate =
  require("./imageGenerator");

const together =
  require("./providers/together");

const pollinations =
  require("./providers/pollinations");

async function generate(prompt) {

  // 1 Replicate

  try {

    const img =
      await replicate.generateImage(prompt);

    if (img) {

      console.log("Using Replicate");

      return img;

    }

  } catch (e) {

    console.log("Replicate Failed");

  }

  // 2 Together

  try {

    const img =
      await together.generate(prompt);

    if (img) {

      console.log("Using Together");

      return img;

    }

  } catch (e) {

    console.log("Together Failed");

  }

  // 3 Pollinations

  console.log("Using Pollinations");

  return pollinations.generate(prompt);

}

module.exports = {
  generate
};
