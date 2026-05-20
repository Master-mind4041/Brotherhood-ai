const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "slap",
  execute(message) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("❌ Mention someone!");

    const gifs = [
      "https://cdn.discordapp.com/attachments/1504906686895357982/1506581319654834246/image0.gif?ex=6a0ec8b1&is=6a0d7731&hm=4291d1abc8a1de1d009552bc283190f99a3deb8b314e0e65081ef23cd4bf349a&",
      "https://cdn.discordapp.com/attachments/1504906686895357982/1506581354194665534/image0.gif?ex=6a0ec8b9&is=6a0d7739&hm=27ce4455cbd2f7f8e9c72f40e716daf986af00ccb1480fd4252db256921d3f72&",
      "https://cdn.discordapp.com/attachments/1504906686895357982/1506581491977551902/image0.gif?ex=6a0ec8da&is=6a0d775a&hm=79e304045d2c0d819219244969e3b739b8537d2ecf87a56c7c8188549a9ee970&"
    ];

    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setTitle(`👋 ${message.author.username} slapped ${user.username} 💥`)
      .setDescription("👨‍💻 Developer: @mastermind7313")
      .setImage(gif)
      .setColor("Red");

    message.channel.send({ embeds: [embed] });
  }
};
