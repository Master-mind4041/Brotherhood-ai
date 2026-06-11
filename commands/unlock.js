const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "unlock",

  async execute(message) {

    if (
      !message.member.permissions.has("Administrator") &&
      message.author.id !== "967804605931069461"
    ) {
      return message.reply(
        "❌ You need Administrator permission to use this command."
      );
    }

    message.delete().catch(() => {});

    try {

      await message.channel.permissionOverwrites.edit(
        message.guild.roles.everyone,
        {
          SendMessages: null
        }
      );

      const embed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("🔓 Channel Unlocked")
        .setDescription(
          `This channel has been unlocked by ${message.author}.`
        )
        .setTimestamp();

      const msg = await message.channel.send({
        embeds: [embed]
      });

      setTimeout(() => {
        msg.delete().catch(() => {});
      }, 5000);

      const logChannelId =
        await db.get(`logchannel_${message.guild.id}`);

      if (logChannelId) {

        const logChannel =
          message.guild.channels.cache.get(logChannelId);

        if (logChannel) {

          const logEmbed = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("🔓 Unlock Log")
            .addFields(
              {
                name: "👮 Moderator",
                value: `${message.author}`,
                inline: true
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

    } catch (err) {
      console.error(err);
      message.channel.send(
        "❌ Failed to unlock channel."
      );
    }
  }
};