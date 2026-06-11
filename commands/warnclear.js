const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "clearwarns",

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
        "❌ Usage: .clearwarns @user"
      );
    }

    const key = `warns_${message.guild.id}_${member.id}`;

    const warns = await db.get(key) || [];

    if (warns.length === 0) {
      return message.channel.send(
        "❌ This user has no warnings."
      );
    }

    await db.delete(key);

    const embed = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle("🧹 Warnings Cleared")
      .addFields(
        {
          name: "👤 User",
          value: `${member.user}`,
          inline: true
        },
        {
          name: "👮 Moderator",
          value: `${message.author}`,
          inline: true
        },
        {
          name: "📊 Warnings Removed",
          value: `${warns.length}`,
          inline: true
        }
      )
      .setTimestamp();

    message.channel.send({
      embeds: [embed]
    });

    // LOG SYSTEM

    const logChannelId =
      await db.get(`logchannel_${message.guild.id}`);

    if (logChannelId) {

      const logChannel =
        message.guild.channels.cache.get(logChannelId);

      if (logChannel) {

        const logEmbed = new EmbedBuilder()
          .setColor("#00ff00")
          .setTitle("🧹 Clear Warnings Log")
          .addFields(
            {
              name: "👤 User",
              value: `${member.user}`,
              inline: true
            },
            {
              name: "👮 Moderator",
              value: `${message.author}`,
              inline: true
            },
            {
              name: "📊 Warnings Removed",
              value: `${warns.length}`,
              inline: true
            }
          )
          .setTimestamp();

        logChannel.send({
          embeds: [logEmbed]
        });
      }
    }
  }
};