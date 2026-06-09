const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "blush",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to blush at! Example: `.blush @user`");
    }

    const gifs = [
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513802687756505158/image1.gif?ex=6a290e1d&is=6a27bc9d&hm=1edc9841ca8460f41382ada6d8223b956ecf2a605652257f9b3e1264402a919f&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513802687349788782/image0.gif?ex=6a290e1d&is=6a27bc9d&hm=7fa71dfbe27b1eca2638f325fead80b6c4c03cdcf0b79ecf154d4035e35fa20e&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513802688196771922/image2.gif?ex=6a290e1d&is=6a27bc9d&hm=dd7c5d1946d4ee1bacd77e