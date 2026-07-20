async function generateVideo(prompt) {

    const imageUrl =
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    return {
        success: true,
        provider: "Free Video",
        model: "Pollinations",
        video: imageUrl
    };

}

module.exports = {
    generateVideo
};
