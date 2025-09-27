import { saveWallets, loadWallets } from "../lib/storage.js";

let wallets = loadWallets();

export default (bot) => {
  bot.onText(/\/wallet (.+)/, (msg, match) => {
    const userId = msg.from.id.toString();
    const addr = match[1].trim();

    const solAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    if (!solAddressRegex.test(addr)) {
      bot.sendMessage(msg.chat.id, "❌ Invalid Solana address format.");
      return;
    }

    wallets[userId] = addr;
    saveWallets(wallets);
    bot.sendMessage(msg.chat.id, `✅ Wallet registered: ${addr}`);
  });
};
