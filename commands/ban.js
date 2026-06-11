const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "ban",

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
        "❌ Usage: .ban @user [reason]"
      );
    }

    if (!member.bannable) {
      return message.channel.send(
        "❌ I cannot ban this user."
      );
    }

    const reason =
      args.slice(1).join(" ") || "No reason provided";

    try {
      await member.send(
        `🔨 You were banned from ${message.guild.name}\nReason: ${reason}`
      );
    } catch {}

    await member.ban({ reason });

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("🔨 Member Banned")
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
          .setColor("#ff0000")
          .setTitle("🔨 Ban Log")
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
              name: "📍 Channel",
              value: `${message.channel}`,
              inline: true
            },
            {
              name: "📝 Reason",
              value: reason,
              inline: false
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