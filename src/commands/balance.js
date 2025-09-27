import { loadWallets } from "../lib/storage.js";
import { getBalance } from "../lib/solana.js";

export default (bot) => {
  bot.onText(/\/balance/, async (msg) => {
    const userId = msg.from.id.toString();
    const wallets = loadWallets();
    if (!wallets[userId]) {
      bot.sendMessage(msg.chat.id, "❌ No wallet registered. Use /wallet <address>");
      return;
    }
    const sol = await getBalance(wallets[userId]);
    bot.sendMessage(msg.chat.id, `💰 Balance: ${sol.toFixed(4)} SOL`);
  });
};
