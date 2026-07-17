require("dotenv").config();

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ==========================
// Telegram Bot
// ==========================

const bot = new TelegramBot(
    process.env.TELEGRAM_BOT_TOKEN,
    {
        polling: true
    }
);

// AI object (Legacy compatibility)
const ai = null;

// ==========================
// Utils
// ==========================

const sendLongMessage = require("./utils/sendLongMessage");
const database = require("./utils/database");

require("./utils/initFolders")();

// ==========================
// Commands
// ==========================

require("./commands/start")(bot);
require("./commands/help")(bot);
require("./commands/status")(bot);
require("./commands/ping")(bot);

require("./commands/story")(bot, ai, sendLongMessage, database);
require("./commands/movie")(bot, ai, sendLongMessage, database);
require("./commands/project")(bot, ai, sendLongMessage, database);

require("./commands/image")(bot, ai, sendLongMessage, database);
require("./commands/video")(bot, ai, sendLongMessage, database);

require("./commands/voice")(bot, ai, sendLongMessage, database);

require("./commands/studio")(bot, ai, sendLongMessage, database);
require("./commands/generateimage")(bot, ai, sendLongMessage, database);
require("./commands/generatevideo")(bot,ai,sendLongMessage,database);
// ==========================
// Express
// ==========================

app.get("/", (req, res) => {

    res.send("🎬 CartoonVerse AI Studio V13 Running");

});

app.get("/health", (req, res) => {

    res.json({

        status: "online",

        bot: "CartoonVerse AI Studio",

        version: "13.0.0",

        uptime: process.uptime(),

        time: new Date().toISOString()

    });

});

// ==========================
// Start Server
// ==========================

app.listen(PORT, () => {

    console.log("🚀 CartoonVerse AI Studio Started");

    console.log(`🌐 Running on Port ${PORT}`);

});
