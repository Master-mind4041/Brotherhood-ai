const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "hug",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to hug! Example: `.hug @user`");
    }

    const gifs = [
      "https://tenor.com/view/cat-gif-6892218099699146160",
      "https://tenor.com/view/don-gif-9520776680112053549",
      "https://tenor.com/view/hug-gif-2838878765604006830"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.author.username} hugs ${user.username} warmly!`,
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