module.exports = function (bot) {

  bot.onText(/\/help/, async (msg) => {

    await bot.sendMessage(
      msg.chat.id,

`📖 CartoonVerse AI V8

Available Commands

🚀 Project
/project Topic

📖 Story
/story Topic

🎬 Movie
/movie Topic

🖼 Image Prompt
/image Topic

🎥 Video Prompt
/video Topic

🏷 Title
/title Topic

🖼 Thumbnail
/thumbnail Topic`

    );

  });

};
