function generateImage(prompt) {

    return {
        success: true,
        image:
            `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`
    };

}

module.exports = {
    generateImage
};
