const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = function (bot, database) {

  bot.onText(/\/pdf$/, async (msg) => {

    const chatId = msg.chat.id;

    try {

      const projects = database.getProjects(chatId);

      if (!projects || projects.length === 0) {

        return bot.sendMessage(
          chatId,
          "❌ No saved project found."
        );

      }

       const filePath = path.join(
  __dirname,
  "../temp/pdf",
  `CartoonVerse_${chatId}.pdf`
);

      const doc = new PDFDocument({
        margin: 40,
        size: "A4"
      });

      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Cover Page

      doc
        .fontSize(24)
        .text("🎬 CartoonVerse AI", {
          align: "center"
        });

      doc.moveDown();

      doc
        .fontSize(18)
        .text("Project Export", {
          align: "center"
        });

      doc.moveDown();

      doc
        .fontSize(12)
        .text(
          `Generated: ${new Date().toLocaleString()}`
        );

      doc.addPage();
            // Projects

      projects.forEach((project, index) => {

        doc
          .fontSize(18)
          .text(`Project ${index + 1}`);

        doc.moveDown(0.5);

        doc
          .fontSize(12)
          .text(`Type : ${project.type || "Unknown"}`);

        doc.text(`Topic : ${project.topic || "Untitled"}`);

        doc.text(
          `Created : ${
            project.createdAt || "Unknown"
          }`
        );

        doc.moveDown();

        doc
          .fontSize(11)
          .text(project.content || "");

        doc.moveDown();

        doc.text(
          "--------------------------------------------"
        );

        doc.moveDown();

      });
            doc.end();

      stream.on("finish", async () => {

  await bot.sendDocument(
    chatId,
    filePath,
    {
      caption: "📄 CartoonVerse Project PDF"
    }
  );

  // Delete after 1 hour
  setTimeout(() => {

    if (fs.existsSync(filePath)) {

      fs.unlinkSync(filePath);

      console.log("🗑 PDF Deleted:", filePath);

    }

  }, 60 * 60 * 1000);

});
          } catch (err) {

      console.error(err);

      await bot.sendMessage(
        chatId,
        "❌ PDF export failed."
      );

    }

  });

};
