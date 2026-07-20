const fs = require("fs");

async function generateVideo(prompt) {

    return {
        success: true,
        provider: "Free Video",
        video: null,
        prompt
    };

}

module.exports = {
    generateVideo
};
