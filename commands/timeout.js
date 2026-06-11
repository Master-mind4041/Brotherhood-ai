const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "timeout",

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
        "❌ Usage: .timeout @user <minutes> [reason]"
      );
    }

    const minutes = parseInt(args[1]);

    if (!minutes || minutes < 1) {
      return message.channel.send(
        "❌ Enter valid timeout minutes."
      );
    }

    const reason =
      args.slice(2).join(" ") || "No reason provided";

    try {

      await member.timeout(
        minutes * 60 * 1000,
        reason
      );

      const embed = new EmbedBuilder()
        .setColor("#ffaa00")
        .setTitle("⏳ Member Timed Out")
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
            name: "⏰ Duration",
            value: `${minutes} minute(s)`,
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
            .setTitle("⏳ Timeout Log")
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
                name: "⏰ Duration",
                value: `${minutes} minute(s)`,
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

    } catch (err) {
      console.error(err);

      message.channel.send(
        "❌ Failed to timeout member."
      );
    }
  }
};