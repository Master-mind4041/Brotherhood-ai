const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "hug",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to hug! Example: `.hug @user`");
    }

    const gifs = [
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513797384273133578/image2.gif?ex=6a29092d&is=6a27b7ad&hm=7ba7e6a6bcf0c52ca0a63cdfa3f9a9a3562d8863eb2db4d3cd8d83465be06f16&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513797383715160175/image0.gif?ex=6a29092d&is=6a27b7ad&hm=1615925f0ff52e446253061e2bb678b7142160d4e998d96dcf749b53257a543a&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513797384000376852/image1.gif?ex=6a29092d&is=6a27b7ad&hm=518a49adc1eaec8735f942d435371251d02e22bc13a078162ec39caeb961be01&"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.member.displayName} hugs ${user.username} warmly!`,
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