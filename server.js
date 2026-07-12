require("dotenv").config();

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// =========================
// Telegram Bot
// =========================

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

// =========================
// Gemini AI
// =========================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =========================
// Utils
// =========================

const sendLongMessage = require("./utils/sendLongMessage");
const database = require("./utils/database");
require("./utils/initFolders")();

// =========================
// Commands
// =========================

require("./commands/start")(bot);
require("./commands/help")(bot);
require("./commands/status")(bot);
require("./commands/ping")(bot);
require("./commands/stats")(bot, database);
require("./commands/backup")(bot, database);
require("./commands/chat")(
  bot,
  ai,
  sendLongMessage,
  database
);

require("./commands/story")(
  bot,
  ai,
  sendLongMessage,
  database
);

require("./commands/project")(
  bot,
  ai,
  sendLongMessage,
  database
);

require("./commands/image")(
  bot,
  ai,
  sendLongMessage,
  database
);

require("./commands/video")(
  bot,
  ai,
  sendLongMessage,
  database
);

require("./commands/movie")(
  bot,
  ai,
  sendLongMessage,
  database
);

require("./commands/title")(
  bot,
  ai,
  sendLongMessage
);

require("./commands/thumbnail")(
  bot,
  ai,
  sendLongMessage
);
require("./commands/save")(bot, database);
require("./commands/projects")(bot, database);
require("./commands/delete")(bot, database);
require("./commands/character")(bot, ai, sendLongMessage, database);
require("./commands/scene")(bot, ai, sendLongMessage, database);
require("./commands/storyboard")(bot, ai, sendLongMessage, database);
require("./commands/episode")(
  bot,
  ai,
  sendLongMessage,
  database
);
require("./commands/voice")(
  bot,
  ai,
  sendLongMessage,
  database
);
require("./commands/movieplus")(
  bot,
  ai,
  sendLongMessage,
  database
);
require("./commands/create")(
  bot,
  ai,
  sendLongMessage,
  database
);
require("./commands/ai")(
  bot,
  ai,
  sendLongMessage,
  database
);
require("./commands/imageprompts")(
  bot,
  ai,
  sendLongMessage,
  database
);
require("./commands/generateimage")(
  bot,
  ai,
  sendLongMessage,
  database
);
require("./commands/videoprompts")(
  bot,
  ai,
  sendLongMessage,
  database
);
require("./commands/pdf")(bot, database);
require("./commands/zip")(bot, database);
// =========================
// Express Routes
// =========================

app.get("/", (req, res) => {
  res.send("🎬 CartoonVerse AI V8 Running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    bot: "CartoonVerse AI V8",
    version: "8.0.0",
    uptime: process.uptime(),
    time: new Date().toISOString(),
  });
});

// =========================
// Start Server
// =========================

app.listen(PORT, () => {
  console.log("🚀 CartoonVerse AI V8 Started");
  console.log(`🌐 Server Running on Port ${PORT}`);
});
