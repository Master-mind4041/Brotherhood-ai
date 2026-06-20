const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "prefix",

  async execute(message) {

    const prefix =
      await db.get(`prefix_${message.guild.id}`) || ".";

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("⚙️ Current Prefix")
      .setDescription(
        `Current Prefix: \`${prefix}\``
      )
      .setTimestamp();

    message.channel.send({
      embeds: [embed]
    });
  }
};