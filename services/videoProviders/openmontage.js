const axios = require("axios");

async function generateVideo(prompt) {

    return {
        success: false,
        provider: "OpenMontage",
        model: "V15",
        message: "OpenMontage not connected yet."
    };

}

module.exports = {
    generateVideo
};
