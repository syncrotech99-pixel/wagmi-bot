import memes from "../data/memes.json" assert { type: "json" };

export default (bot) => {
  bot.onText(/\/meme/, (msg) => {
    const meme = memes[Math.floor(Math.random() * memes.length)];
    bot.sendPhoto(msg.chat.id, meme);
  });
};
