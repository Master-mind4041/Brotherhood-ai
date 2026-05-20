const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "slap",
  execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("❌ Mention someone!");

    const embed = new EmbedBuilder()
      .setTitle("👋 Slap Action")
      .setDescription(`${message.author} slapped ${user} 💥`)
      .setColor("Red");

    message.channel.send({ embeds: [embed] });
  }
};
