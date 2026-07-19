async function generateVideo(prompt) {

    return {
        success: false,
        provider: "OpenMontage",
        model: "V15",
        message: "OpenMontage is not connected yet."
    };

}

module.exports = {
    generateVideo
};
