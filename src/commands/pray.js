export default (bot) => {
    bot.onText(/\/pray/, (msg) => {
      const isBlessed = Math.random() < 0.1;
      const response = isBlessed
        ? "✨ Oracle Blessing! You might get lucky in the next airdrop. WAGMI!"
        : "🤏 The Oracle is silent... try again later.";
      bot.sendMessage(msg.chat.id, response);
    });
  };
  