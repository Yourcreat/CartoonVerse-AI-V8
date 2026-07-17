const axios = require("axios");

async function generateImage(prompt) {

    const url =
        "https://image.pollinations.ai/prompt/" +
        encodeURIComponent(prompt);

    return {
        success: true,
        provider: "Pollinations AI",
        model: "Flux",
        image: url,
        prompt
    };

}

module.exports = {
    generateImage
};
