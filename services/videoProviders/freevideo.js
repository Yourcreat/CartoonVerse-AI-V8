const pollinations = require("./pollinations");

async function generateVideo(prompt) {

    const image =
        pollinations.generateImage(prompt);

    return {
        success: true,
        provider: "Free Video",
        model: "Pollinations",
        image: image.image
    };

}

module.exports = {
    generateVideo
};
