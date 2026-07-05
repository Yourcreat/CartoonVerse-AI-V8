require("dotenv").config();

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const { GoogleGenAI } = require("@google/genai");

const app = express();

const bot = new TelegramBot(
  process.env.TELEGRAM_BOT_TOKEN,
  { polling: true }
);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🎬 CartoonVerse AI V8 Running");
});
// Utils
const sendLongMessage = require("./utils/sendLongMessage");
const database = require("./utils/database");

// Commands
require("./commands/start")(bot);
require("./commands/help")(bot);

require("./commands/story")(bot, ai, sendLongMessage, database);
require("./commands/project")(bot, ai, sendLongMessage, database);
require("./commands/image")(bot, ai, sendLongMessage, database);
require("./commands/video")(bot, ai, sendLongMessage, database);
require("./commands/movie")(bot, ai, sendLongMessage, database);
require("./commands/title")(bot, ai, sendLongMessage);
require("./commands/thumbnail")(bot, ai, sendLongMessage);

// Start Command
// Help Command
// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "online",
    bot: "CartoonVerse AI V8",
    version: "8.0.0"
  });
});

// Start Server
app.listen(PORT, () => {

  console.log("🚀 CartoonVerse AI V8 Started");
  console.log(`🌐 Running on Port ${PORT}`);

});

