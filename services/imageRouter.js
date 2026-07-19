const pollinations = require("./imageProviders/pollinations");

async function generateImage(prompt) {

    return pollinations.generateImage(prompt);

}

module.exports = {
    generateImage
};
