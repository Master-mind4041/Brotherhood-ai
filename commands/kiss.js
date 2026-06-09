const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "kiss",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to kiss! Example: `.kiss @user`");
    }

    const gifs = [
      "https://tenor.com/view/gaugauchutchut19-gif-7112525068260214305",
      "https://tenor.com/view/kiss-gif-9230500426386331028",
      "https://tenor.com/view/besos-gif-6180200097750952521"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.author.username} kisses ${user.username}!`,
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