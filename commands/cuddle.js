const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "cuddle",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to cuddle! Example: `.cuddle @user`");
    }

    const gifs = [
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513797800901476393/image2.gif?ex=6a290990&is=6a27b810&hm=4dcbbeb84cd4d91ae98b951ae73feb67bf911caa684e0cfe2c85192e853cc1a4&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513797800108888084/image0.gif?ex=6a290990&is=6a27b810&hm=31de716ed6db7dd2e6564229bec083778fee13d9467b56d51821f7a726c719b7&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513797800482177045/image1.gif?ex=6a290990&is=6a27b810&hm=5d712b5a44ed679a5accade3538fa417b285ad25615d80c0a2bf11af2c749a6d&"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.member.displayName} cuddles ${user.username} closely!`,
        iconURL: message.author.displayAvatarURL()
      })
      .setImage(randomGif)
      .setFooter({
        text: "Developer - @mastermind7313"
      });

    message.channel.send({
      content: `${message.author} ${user}`,
      embeds: [embed]
    });
  }
};