const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "pat",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to pat! Example: `.pat @user`");
    }

    const gifs = [
      "https://cdn.discordapp.com/attachments/1504906686895357982/1506585706695364688/image0.gif?ex=6a136a07&is=6a121887&hm=b8e3de78ffc0085c1dc91eac7272142f1b7b6f177a249987ffa4701f60cb5ee3&",
      "https://cdn.discordapp.com/attachments/1504906686895357982/1506585721727881247/image0.gif?ex=6a136a0b&is=6a12188b&hm=1e8862e5ddc3bb4cf96a19e14a6526a28d3e0c7edf306939e6c0aa8b993e8639&",
      "https://cdn.discordapp.com/attachments/1504906686895357982/1506585845392740402/image0.gif?ex=6a136a28&is=6a1218a8&hm=16092056387a8b62333f41fd79a4db131150804a8206fa48038d90af9be6edd1&"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.author.username} pats ${user.username} gently!`,
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