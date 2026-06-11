const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "unban",

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

    const userId = args[0];

    if (!userId) {
      return message.channel.send(
        "❌ Usage: .unban <userID>"
      );
    }

    try {

      const bannedUsers =
        await message.guild.bans.fetch();

      const bannedUser =
        bannedUsers.get(userId);

      if (!bannedUser) {
        return message.channel.send(
          "❌ User is not banned."
        );
      }

      await message.guild.members.unban(userId);

      const embed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("✅ Member Unbanned")
        .addFields(
          {
            name: "👤 User",
            value: `${bannedUser.user.tag}`,
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
            .setTitle("✅ Unban Log")
            .addFields(
              {
                name: "👤 User",
                value: `${bannedUser.user.tag}`,
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
        "❌ Failed to unban user."
      );
    }
  }
};