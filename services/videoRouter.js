const freevideo = require("./videoProviders/freevideo");

async function generateVideo(prompt) {

    try {

        const result = await freevideo.generateVideo(prompt);

        return result;

    } catch (err) {

        console.log(err);

        return {
            success: false,
            provider: "Free Video",
            model: "FFmpeg",
            message: err.message
        };

    }

}

module.exports = {
    generateVideo
};
