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

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply(
        "❌ Usage: .kick @user [reason]"
      );
    }

    if (!member.kickable) {
      return message.reply(
        "❌ I cannot kick this user."
      );
    }

    const reason =
      args.slice(1).join(" ") || "No reason provided";

    try {
      await member.send(
        `👢 You were kicked from **${message.guild.name}**\nReason: ${reason}`
      );
    } catch {}

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("👢 Member Kicked")
      .addFields(
        {
          name: "User",
          value: `${member.user.tag}`,
          inline: true
        },
        {
          name: "Moderator",
          value: `${message.author.tag}`,
          inline: true
        },
        {
          name: "Reason",
          value: reason
        }
      )
      .setTimestamp();

    await message.channel.send({
      embeds: [embed]
    });

    // LOG
    const logChannelId =
      await db.get(`logchannel_${message.guild.id}`);

    if (logChannelId) {

      const logChannel =
        message.guild.channels.cache.get(logChannelId);

      if (logChannel) {

        const logEmbed = new EmbedBuilder()
          .setColor("#ff0000")
          .setTitle("👢 Kick Log")
          .addFields(
            {
              name: "User",
              value: `${member.user.tag}`,
              inline: true
            },
            {
              name: "Moderator",
              value: `${message.author.tag}`,
              inline: true
            },
            {
              name: "Reason",
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