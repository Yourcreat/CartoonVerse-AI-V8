const axios = require("axios");

async function generateVideo(prompt) {

    const imageUrl =
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    return {
        success: true,
        provider: "Free Video",
        model: "Pollinations + FFmpeg",
        image: imageUrl
    };

}

module.exports = {
    generateVideo
};
