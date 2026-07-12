const axios = require("axios");

async function generateImage(prompt) {

  const response = await axios.post(
    "https://fal.run/fal-ai/flux/dev",
    {
      prompt: prompt
    },
    {
      headers: {
        Authorization: `Key ${process.env.FAL_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.images[0].url;

}

module.exports = {
  generateImage
};
