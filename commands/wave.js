const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "wave",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to wave at! Example: `.wave @user`");
    }

    const gifs = [
      "https://tenor.com/view/cute-animals-mochi-mochi-peach-cat-goma-cat-wave-gif-3501325470361230365",
      "https://tenor.com/view/quby-high-five-wave-pentol-qubysani-gif-19935273",
      "https://tenor.com/view/hola-gif-13727162376112743773"
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