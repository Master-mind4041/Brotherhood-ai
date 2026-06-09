const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "cuddle",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to cuddle! Example: `.cuddle @user`");
    }

    const gifs = [
      "https://tenor.com/view/peach-loves-goma-peach-and-goma-peach-cat-goma-cat-peach-gif-6528988118635085144",
      "https://tenor.com/view/snuggle-in-bed-mochi-peach-gif-1556884311883585909",
      "https://tenor.com/view/milk-and-mocha-milk-mocha-milk-mocha-bear-milk-bear-mocha-bear-gif-7270252476476520589"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `${message.author.username} cuddles ${user.username} closely!`,
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