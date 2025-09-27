import { loadWallets } from "../lib/storage.js";

export default (bot, ADMINS) => {
  bot.onText(/\/export_airdrop/, (msg) => {
    const userId = msg.from.id.toString();
    if (!ADMINS.includes(userId)) {
      bot.sendMessage(msg.chat.id, "⛔ Admins only.");
      return;
    }
    const wallets = loadWallets();
    let exportText = "UserID,Solana Wallet\n";
    for (let id in wallets) {
      exportText += `${id},${wallets[id]}\n`;
    }
    bot.sendMessage(msg.chat.id, "📥 Export of wallets:\n" + exportText);
  });
};
