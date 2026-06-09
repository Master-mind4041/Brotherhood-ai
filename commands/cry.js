const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "cry",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to cry to! Example: `.cry @user`");
    }

    const gifs = [
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513802842643763260/image2.gif?ex=6a290e42&is=6a27bcc2&hm=c7db1431e902cac56124518b8c72c31629b7f98475fd0172a5d50a643da09635&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513802842388037763/image1.gif?ex=6a290e42&is=6a27bcc2&hm=2c1f2c367c683fd79eec7bd13247a315384adb4b9e368db92b9585831a4c2f40&",
      "https://cdn.discordapp.com/attachments/1467434180748120104/1513802843000275117/image2.gif?ex=6a290e42&is=6a27bcc2&hm=453f23e1a2d79dd3d94a4b820e69cdad5103b389ad2ff0ad484156518b2b85bb&"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.member.displayName} cries because of ${user.username}!`,
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