const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const path = require("path");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

async function createVideo(imagePath) {

    const outputDir = path.join(__dirname, "../temp/videos");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputVideo = path.join(outputDir, "video.mp4");

    return new Promise((resolve, reject) => {

        ffmpeg(imagePath)
            .loop(5)
            .fps(30)
            .videoCodec("libx264")
            .outputOptions([
                "-pix_fmt yuv420p"
            ])
            .save(outputVideo)
            .on("end", () => {
                resolve(outputVideo);
            })
            .on("error", (err) => {
                reject(err);
            });

    });

}

module.exports = {
    createVideo
};
