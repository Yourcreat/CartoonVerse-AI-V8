const fs = require("fs");
const path = require("path");

module.exports = function () {

  const folders = [
    "assets/temp/pdf",
    "assets/temp/zip",
    "assets/temp/images",
    "assets/temp/videos"
  ];

  folders.forEach(folder => {

    const folderPath = path.join(__dirname, "..", folder);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log("📁 Created:", folder);
    }

  });

};
