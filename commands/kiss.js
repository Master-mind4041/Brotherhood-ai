const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "kiss",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to kiss! Example: `.kiss @user`");
    }

    const gifs = [
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513799213568495679/image0.gif?ex=6a290ae1&is=6a27b961&hm=ba0acbc53c8f64d340c45da1a6aa4eb7b63e65f49f3ccf1d1e744aad5cc1bdc9&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513799213849378937/image1.gif?ex=6a290ae1&is=6a27b961&hm=99a00b6c14be40dac3fa4e682b2427b26ce8f7fd35ee777fb5af2da9ff0f39ae&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513799214138789908/image2.gif?ex=6a290ae1&is=6a27b961&hm=f2928dc4d1d6257ca71ef6080095be4d7f48e27f6f2d84b8308595b627e46bcf&"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.member.displayName} kisses ${user.username}!`,
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