import { loadWallets } from "../lib/storage.js";
export default (bot) => {
  bot.onText(/\/mywallet/, (msg) => {
    const userId = msg.from.id.toString();
    const wallets = loadWallets();
    if (wallets[userId]) {
      bot.sendMessage(msg.chat.id, `💰 Your wallet: ${wallets[userId]}`);
    } else {
      bot.sendMessage(msg.chat.id, "❌ No wallet registered. Use /wallet <your_solana_address>");
    }
  });
};
