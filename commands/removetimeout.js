const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "untimeout",

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
        "❌ Usage: .untimeout @user"
      );
    }

    try {

      await member.timeout(null);

      const embed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("✅ Timeout Removed")
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
            .setColor("#00ff00")
            .setTitle("✅ Untimeout Log")
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
        "❌ Failed to remove timeout."
      );
    }
  }
};