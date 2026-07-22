const pollinations = require("./pollinations");
const { downloadImage } = require("../../utils/downloadImage");
const { createVideo } = require("../../utils/createVideo");

async function generateVideo(prompt) {

    // Image generate
    const imageResult = pollinations.generateImage(prompt);

    // Image download
    const imagePath = await downloadImage(
        imageResult.image,
        "frame.jpg"
    );

    // Video create
    const videoPath = await createVideo(imagePath);

    return {
        success: true,
        provider: "Free Video",
        model: "FFmpeg",
        video: videoPath
    };

}

module.exports = {
    generateVideo
};
