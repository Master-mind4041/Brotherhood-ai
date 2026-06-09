const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "wave",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to wave at! Example: `.wave @user`");
    }

    const gifs = [
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513801553440538745/image2.gif?ex=6a290d0f&is=6a27bb8f&hm=8add4dd21aaec8dfeb848f114c6f079af87e42e8d0e5941862462db864f7928b&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513801552882565150/image1.gif?ex=6a290d0f&is=6a27bb8f&hm=24c2c5efcbec549a74243085d7eda5ddbdea8951ceb25a9f780c7402494f276a&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513801552324853810/image0.gif?ex=6a290d0f&is=6a27bb8f&hm=e3aae65aead39fe50ad42b53c0f43398eb355b97627d99ac243cfdb995a62dde&"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.author.username} waves at ${user.username}!`,
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