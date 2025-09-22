import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import TelegramBot from "node-telegram-bot-api";

// === ENV VARIABLES ===
const BOT_TOKEN = process.env.TELEGRAM_TOKEN;     // Telegram Bot API Token
const ADMINS = (process.env.WGMI_ADMINS || "").split(",").map(x => x.trim()); 
const SOLANA_SECRET = JSON.parse(process.env.SOLANA_SECRET || "[]"); // Phantom secret array

// === SOLANA SETUP ===
const connection = new Connection("https://api.testnet.solana.com");
const wallet = Keypair.fromSecretKey(Uint8Array.from(SOLANA_SECRET));

// === TELEGRAM BOT SETUP ===
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// === ORACLE MEMES ===
const PROPHECIES = [
  "🔮 The Oracle whispers: HODL and the moon will open its arms. WAGMI.",
  "🌙 Vision: candles green, bags heavy. Repeat chant: WAGMI $WGMI",
  "✨ The crystal ball shows memes, raiding, and blessed airdrops.",
  "🔥 The Oracle chuckles: 'Buy now, tell the story later.'"
];

// === COMMANDS ===
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 
    "🐸 Welcome to $WGMI Oracle!\n\n" +
    "Commands:\n" +
    "/wgmi - prophecy\n" +
    "/wallet <SOL> - register your Solana wallet\n" +
    "/mywallet - see your wallet\n" +
    "/pray - Oracle Blessing chance\n" +
    "/meme - send meme\n" +
    "Admins: /export_airdrop"
  );
});

bot.onText(/\/wgmi/, (msg) => {
  bot.sendMessage(msg.chat.id, PROPHECIES[Math.floor(Math.random()*PROPHECIES.length)]);
});

// Simple in-memory wallet store
const wallets = {};

// /wallet <address>
bot.onText(/\/wallet (.+)/, (msg, match) => {
  const userId = msg.from.id.toString();
  const addr = match[1].trim();
  if (!/^([1-9A-HJ-NP-Za-km-z]{32,44})$/.test(addr)) {
    bot.sendMessage(msg.chat.id, "❌ Invalid Solana address format.");
    return;
  }
  wallets[userId] = addr;
  bot.sendMessage(msg.chat.id, `✅ Wallet registered: ${addr}`);
});

// /mywallet
bot.onText(/\/mywallet/, (msg) => {
  const userId = msg.from.id.toString();
  if (wallets[userId]) {
    bot.sendMessage(msg.chat.id, `💰 Your wallet: ${wallets[userId]}`);
  } else {
    bot.sendMessage(msg.chat.id, "No wallet registered. Use /wallet <your_solana_address>");
  }
});

// /pray
bot.onText(/\/pray/, (msg) => {
  if (Math.random() < 0.1) {
    bot.sendMessage(msg.chat.id, "✨ Oracle Blessing! You might get lucky in the next airdrop. WAGMI!");
  } else {
    bot.sendMessage(msg.chat.id, "🤏 The Oracle is silent... try again later.");
  }
});

// Admin command: /export_airdrop
bot.onText(/\/export_airdrop/, (msg) => {
  const userId = msg.from.id.toString();
  if (!ADMINS.includes(userId)) {
    bot.sendMessage(msg.chat.id, "⛔ Admins only.");
    return;
  }
  let text = "UserID,Solana Wallet\n";
  for (let id in wallets) {
    text += `${id},${wallets[id]}\n`;
  }
  bot.sendMessage(msg.chat.id, "📥 Export of wallets:\n" + text);
});

console.log("🐸 WGMI Solana Telegram Bot running...");
