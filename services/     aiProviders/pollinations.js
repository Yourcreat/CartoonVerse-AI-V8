const axios = require("axios");

async function generate(prompt) {

    const url =
        "https://text.pollinations.ai/" +
        encodeURIComponent(prompt);

    const response = await axios.get(url, {
        timeout: 60000
    });

    return response.data;

}

module.exports = {
    generate
};
