const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "removewarn",

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
        "❌ Usage: .removewarn @user <warning number>"
      );
    }

    const warnNumber = parseInt(args[1]);

    if (!warnNumber) {
      return message.channel.send(
        "❌ Specify a warning number."
      );
    }

    const key = `warns_${message.guild.id}_${member.id}`;

    let warns = await db.get(key) || [];

    if (warns.length === 0) {
      return message.channel.send(
        "❌ This user has no warnings."
      );
    }

    if (warnNumber < 1 || warnNumber > warns.length) {
      return message.channel.send(
        "❌ Invalid warning number."
      );
    }

    const removedWarn = warns.splice(warnNumber - 1, 1)[0];

    await db.set(key, warns);

    const embed = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle("✅ Warning Removed")
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
          name: "📝 Removed Reason",
          value: removedWarn.reason
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
          .setTitle("✅ Warning Removed Log")
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
              name: "📝 Removed Reason",
              value: removedWarn.reason
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