const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "clone",

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

      const clonedChannel =
        await message.channel.clone();

      await clonedChannel.setPosition(
        message.channel.position + 1
      );

      const embed = new EmbedBuilder()
        .setColor("#00ffcc")
        .setTitle("📑 Channel Cloned")
        .setDescription(
          `Channel cloned by ${message.author}`
        )
        .setTimestamp();

      await clonedChannel.send({
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
            .setColor("#00ffcc")
            .setTitle("📑 Clone Log")
            .addFields(
              {
                name: "👮 Moderator",
                value: `${message.author}`,
                inline: true
              },
              {
                name: "📍 Original Channel",
                value: `${message.channel}`,
                inline: true
              },
              {
                name: "📄 Cloned Channel",
                value: `${clonedChannel}`,
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
        "❌ Failed to clone channel."
      );
    }
  }
};