import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { getWallet } from "./lib/solana.js";

// === ENV ===
dotenv.config();
const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
const ADMINS = (process.env.WGMI_ADMINS || "").split(",").map(x => x.trim());
const SOLANA_SECRET = JSON.parse(process.env.SOLANA_SECRET || "[]");

if (!BOT_TOKEN || SOLANA_SECRET.length === 0) {
  console.error("❌ Missing required environment variables.");
  process.exit(1);
}

// === WALLET ===
const oracleWallet = getWallet(SOLANA_SECRET);

// === TELEGRAM BOT ===
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// === COMMANDS ===
import start from "./commands/start.js";
import prophecy from "./commands/prophecy.js";
import wallet from "./commands/wallet.js";
import mywallet from "./commands/mywallet.js";
import balance from "./commands/balance.js";
import pray from "./commands/pray.js";
import meme from "./commands/meme.js";
import exportCmd from "./commands/export.js";

[start, prophecy, wallet, mywallet, balance, pray, meme].forEach(cmd => cmd(bot));
exportCmd(bot, ADMINS);

console.log("🐸 WGMI Solana Telegram Bot running...");

