const freevideo = require("./videoProviders/freevideo");

async function generateVideo(prompt) {

    try {

        const result = await freevideo.generateVideo(prompt);

        return result;

    } catch (err) {

        console.log(err);

        return {
            success: false,
            provider: "None",
            model: "None",
            message: "Video Generation Failed."
        };

    }

}

module.exports = {
    generateVideo
};
