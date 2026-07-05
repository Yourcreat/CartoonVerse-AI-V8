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
