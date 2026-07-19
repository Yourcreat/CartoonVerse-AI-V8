const pollinations = require("./imageProviders/pollinations");

async function generateImage(prompt) {

    try {

        const result = pollinations.generateImage(prompt);

        return {
            success: true,
            provider: result.provider,
            image: result.image
        };

    } catch (err) {

        console.log(err);

        return {
            success: false,
            provider: "None",
            image: null
        };

    }

}

module.exports = {
    generateImage
};
