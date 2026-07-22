async function generateImage(prompt) {

    return {
        success: true,
        provider: "Pollinations",
        image: `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`
    };

}

module.exports = {
    generateImage
};
