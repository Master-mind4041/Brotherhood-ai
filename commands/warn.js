const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "warn",

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
        "❌ Usage: .warn @user <reason>"
      );
    }

    const reason =
      args.slice(1).join(" ") || "No reason provided";

    const warnKey =
      `warns_${message.guild.id}_${member.id}`;

    let warns = await db.get(warnKey);

    if (!warns) warns = [];

    warns.push({
      reason: reason,
      moderator: message.author.id,
      date: Date.now()
    });

    await db.set(warnKey, warns);

    const embed = new EmbedBuilder()
      .setColor("#ffaa00")
      .setTitle("⚠️ User Warned")
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
          name: "📊 Total Warnings",
          value: `${warns.length}`,
          inline: true
        },
        {
          name: "📝 Reason",
          value: reason
        }
      )
      .setTimestamp();

    const msg = await message.channel.send({
      embeds: [embed]
    });

    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);

    // LOG SYSTEM

    const logChannelId =
      await db.get(`logchannel_${message.guild.id}`);

    if (logChannelId) {

      const logChannel =
        message.guild.channels.cache.get(logChannelId);

      if (logChannel) {

        const logEmbed = new EmbedBuilder()
          .setColor("#ffaa00")
          .setTitle("⚠️ Warning Log")
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
              name: "📊 Warning Count",
              value: `${warns.length}`,
              inline: true
            },
            {
              name: "📝 Reason",
              value: reason
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