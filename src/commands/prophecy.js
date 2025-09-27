
import prophecies from "../data/prophecies.json" assert { type: "json" };

export default (bot) => {
  bot.onText(/\/wgmi/, (msg) => {
    const prophecy = prophecies[Math.floor(Math.random() * prophecies.length)];
    bot.sendMessage(msg.chat.id, `🔮 ${prophecy}`);
  });
};
