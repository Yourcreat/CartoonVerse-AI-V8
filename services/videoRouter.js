const falvideo = require("./videoProviders/falvideo");

async function generateVideo(prompt) {

    try {

        return await falvideo.generateVideo(prompt);

    } catch (err) {

        console.log(err);

        return {
            success: false,
            provider: "Fal AI",
            model: "LTX-Video",
            message: err.message
        };

    }

}

module.exports = {
    generateVideo
};
