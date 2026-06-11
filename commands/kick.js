const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "kick",

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
        "❌ Usage: .kick @user [reason]"
      );
    }

    if (!member.kickable) {
      return message.channel.send(
        "❌ I cannot kick this user."
      );
    }

    const reason =
      args.slice(1).join(" ") || "No reason provided";

    try {
      await member.send(
        `👢 You were kicked from ${message.guild.name}\nReason: ${reason}`
      );
    } catch {}

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor("#ff6600")
      .setTitle("👢 Member Kicked")
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
          name: "📝 Reason",
          value: reason,
          inline: false
        }
      )
      .setTimestamp();

    await message.channel.send({
      embeds: [embed]
    });

    const logChannelId =
      await db.get(`logchannel_${message.guild.id}`);

    if (logChannelId) {

      const logChannel =
        message.guild.channels.cache.get(logChannelId);

      if (logChannel) {

        const logEmbed = new EmbedBuilder()
          .setColor("#ff6600")
          .setTitle("👢 Kick Log")
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
              name: "📝 Reason",
              value: reason,
              inline: false
            },
            {
              name: "📍 Channel",
              value: `${message.channel}`,
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