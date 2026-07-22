const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function downloadImage(url, filename = "frame.jpg") {

    const dir = path.join(__dirname, "../temp/images");

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, filename);

    const response = await axios({
        url,
        method: "GET",
        responseType: "stream"
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on("finish", () => resolve(filePath));
        writer.on("error", reject);
    });

}

module.exports = {
    downloadImage
};
