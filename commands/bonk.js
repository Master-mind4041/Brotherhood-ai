const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "bonk",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to bonk! Example: `.bonk @user`");
    }

    const gifs = [
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513803468282921100/image1.gif?ex=6a290ed7&is=6a27bd57&hm=f1ef06776c30c1ac9174738f7e5f015f937e6ccb89c3cadb43d750c522b4bc8c&",
      
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513803467922083982/image0.gif?ex=6a290ed7&is=6a27bd57&hm=92d54dbdbd321918e3b5e195a238eed60046532b7075f8bf248babf8eb00be10&",
      
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513803468597366894/image2.gif?ex=6a290ed8&is=6a27bd58&hm=7145376845ca74eff30028d29304bed6f0037fa2713070a89b8a68fdf23ca3a2&"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.member.displayName} bonks ${user.username}!`,
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