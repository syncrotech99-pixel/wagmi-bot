// === IMPORTS ===
const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const TelegramBot = require("node-telegram-bot-api");

// === ENV VARIABLES ===
const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
const ADMINS = (process.env.WGMI_ADMINS || "").split(",").map(x => x.trim());
const SOLANA_SECRET = JSON.parse(process.env.SOLANA_SECRET || "[]");

if (!BOT_TOKEN || SOLANA_SECRET.length === 0) {
  console.error("❌ Missing required environment variables (TELEGRAM_TOKEN or SOLANA_SECRET)");
  process.exit(1);
}

// === SOLANA SETUP ===
const connection = new Connection("https://api.testnet.solana.com");
const wallet = Keypair.fromSecretKey(Uint8Array.from(SOLANA_SECRET));

// === TELEGRAM BOT SETUP ===
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// === ORACLE PROPHECIES ===
const PROPHECIES = [
  "🔮 The Oracle whispers: HODL and the moon will open its arms. WAGMI.",
  "🌙 Vision: candles green, bags heavy. Repeat chant: WAGMI $WGMI",
  "✨ The crystal ball shows memes, raiding, and blessed airdrops.",
  "🔥 The Oracle chuckles: 'Buy now, tell the story later.'"
];

// === IN-MEMORY WALLET STORE ===
const wallets = {};

// === COMMANDS ===

// /start
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

// /wgmi
bot.onText(/\/wgmi/, (msg) => {
  const prophecy = PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
  bot.sendMessage(msg.chat.id, `🔮 ${prophecy}`);
});

// /wallet <address>
bot.onText(/\/wallet (.+)/, (msg, match) => {
  const userId = msg.from.id.toString();
  const addr = match[1].trim();

  const solAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  if (!solAddressRegex.test(addr)) {
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
    bot.sendMessage(msg.chat.id, "❌ No wallet registered. Use /wallet <your_solana_address>");
  }
});

// /pray
bot.onText(/\/pray/, (msg) => {
  const isBlessed = Math.random() < 0.1;
  const response = isBlessed
    ? "✨ Oracle Blessing! You might get lucky in the next airdrop. WAGMI!"
    : "🤏 The Oracle is silent... try again later.";
  bot.sendMessage(msg.chat.id, response);
});

// /meme
bot.onText(/\/meme/, (msg) => {
  // Add actual meme URLs if you want, for now just a message
  bot.sendMessage(msg.chat.id, "📸 Memes are coming soon. Stay tuned.");
});

// /export_airdrop (admin only)
bot.onText(/\/export_airdrop/, (msg) => {
  const userId = msg.from.id.toString();
  if (!ADMINS.includes(userId)) {
    bot.sendMessage(msg.chat.id, "⛔ Admins only.");
    return;
  }

  let exportText = "UserID,Solana Wallet\n";
  for (let id in wallets) {
    exportText += `${id},${wallets[id]}\n`;
  }

  bot.sendMessage(msg.chat.id, "📥 Export of wallets:\n" + exportText);
});

console.log("🐸 WGMI Solana Telegram Bot running...");
