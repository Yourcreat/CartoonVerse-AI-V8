const fs = require("fs");
const path = require("path");

module.exports = function () {

  const folders = [
    "temp/pdf",
    "temp/zip",
    "temp/images",
    "temp/videos"
  ];

  folders.forEach(folder => {

    const folderPath = path.join(__dirname, "..", folder);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log("📁 Created:", folder);
    }

  });

};
