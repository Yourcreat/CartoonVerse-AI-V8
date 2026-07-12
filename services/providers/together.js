const axios = require("axios");

async function generate(prompt) {

  try {

    const response = await axios.post(
      "https://api.together.xyz/v1/images/generations",
      {
        model: "black-forest-labs/FLUX.1-schnell-Free",
        prompt: prompt,
        width: 1024,
        height: 1024,
        steps: 4,
        n: 1
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.data[0].url;

  } catch (err) {

    console.error("Together Error:", err.message);

    return null;

  }

}

module.exports = {
  generate
};
