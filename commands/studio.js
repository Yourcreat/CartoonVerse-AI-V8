const pipeline = require("../services/pipeline");

module.exports = function (
    bot,
    ai,
    sendLongMessage,
    database
) {

    bot.onText(/\/studio(?:\s+(.+))?/, async (msg, match) => {

        const chatId = msg.chat.id;

        if (!match[1]) {
            return bot.sendMessage(
                chatId,
                "❌ Usage:\n\n/studio Football Hero"
            );
        }

        const topic = match[1];

        try {

            await bot.sendMessage(
                chatId,
`🎬 CartoonVerse AI Studio V13

━━━━━━━━━━━━━━━━━━

🚀 Starting Production...

📖 Story
🎭 Character
🎬 Storyboard
🎙 Voice
🖼 Image Prompts
🎥 Video Prompts

Please wait...

━━━━━━━━━━━━━━━━━━`
            );

            const project = await pipeline.createMovie(
                chatId,
                topic
            );

            // ==========================
            // STORY
            // ==========================

            await bot.sendMessage(
                chatId,
                "📖 STORY ✅"
            );

            await sendLongMessage(
                bot,
                chatId,
                project.story
            );

            // ==========================
            // CHARACTER
            // ==========================

            await bot.sendMessage(
                chatId,
                "🎭 CHARACTER ✅"
            );

            await sendLongMessage(
                bot,
                chatId,
                project.character
            );

            // ==========================
            // SCENES
            // ==========================

            await bot.sendMessage(
                chatId,
                "🎬 SCENES ✅"
            );

            await sendLongMessage(
                bot,
                chatId,
                project.scene
            );

            // ==========================
            // VOICE
            // ==========================

            if (project.voice) {

                await bot.sendMessage(
                    chatId,
                    "🎙 VOICE SCRIPT ✅"
                );

                await sendLongMessage(
                    bot,
                    chatId,
                    project.voice
                );

            }

            // ==========================
            // IMAGE PROMPTS
            // ==========================

            if (project.imagePrompts) {

                await bot.sendMessage(
                    chatId,
                    "🖼 IMAGE PROMPTS ✅"
                );

                await sendLongMessage(
                    bot,
                    chatId,
                    project.imagePrompts
                );

            }

            // ==========================
            // VIDEO PROMPTS
            // ==========================

            if (project.videoPrompts) {

                await bot.sendMessage(
                    chatId,
                    "🎥 VIDEO PROMPTS ✅"
                );

                await sendLongMessage(
                    bot,
                    chatId,
                    project.videoPrompts
                );

            }

            // ==========================
            // FINISH
            // ==========================

            await bot.sendMessage(
                chatId,
`🎉 CartoonVerse AI Studio Finished

━━━━━━━━━━━━━━━━━━

📂 Project
${topic}

Available Commands

/studio ${topic}

/story ${topic}

/movie ${topic}

/image ${topic}

/project ${topic}

━━━━━━━━━━━━━━━━━━

✅ Production Package Ready`
            );

        } catch (err) {

            console.error("Studio Error:", err);

            await bot.sendMessage(
                chatId,
`❌ Studio Generation Failed

Reason:
${err.message || "Unknown Error"}

Please try again.`
            );

        }

    });

};
