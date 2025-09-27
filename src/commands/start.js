export default (bot) => {
    bot.onText(/\/start/, (msg) => {
      bot.sendMessage(msg.chat.id,
        "🐸 Welcome to $WGMI Oracle!\n\n" +
        "Commands:\n" +
        "/wgmi - prophecy\n" +
        "/wallet <SOL> - register your Solana wallet\n" +
        "/mywallet - see your wallet\n" +
        "/balance - check balance\n" +
        "/pray - Oracle Blessing chance\n" +
        "/meme - send meme\n" +
        "Admins: /export_airdrop"
      );
    });
  };
