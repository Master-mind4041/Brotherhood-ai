const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "warnings",

  async execute(message, args) {

    if (
      !message.member.permissions.has("Administrator") &&
      message.author.id !== "967804605931069461"
    ) {
      return message.reply(
        "❌ You need Administrator permission to use this command."
      );
    }

    message.delete().catch(() => {});

    const member = message.mentions.members.first();

    if (!member) {
      return message.channel.send(
        "❌ Usage: .warnings @user"
      );
    }

    const warns =
      await db.get(`warns_${message.guild.id}_${member.id}`) || [];

    if (warns.length === 0) {
      return message.channel.send(
        "✅ This user has no warnings."
      );
    }

    const warningList = warns
      .map((warn, index) =>
        `**#${index + 1}** • ${warn.reason}`
      )
      .join("\n");

    const embed = new EmbedBuilder()
      .setColor("#ffaa00")
      .setTitle(`⚠️ Warnings for ${member.user.username}`)
      .setDescription(warningList)
      .addFields({
        name: "📊 Total Warnings",
        value: `${warns.length}`,
        inline: true
      })
      .setTimestamp();

    message.channel.send({
      embeds: [embed]
    });
  }
};