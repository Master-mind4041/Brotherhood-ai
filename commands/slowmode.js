const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "slowmode",

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

    const seconds = parseInt(args[0]);

    if (isNaN(seconds) || seconds < 0 || seconds > 21600) {
      return message.channel.send(
        "❌ Usage: .slowmode <0-21600>"
      );
    }

    await message.channel.setRateLimitPerUser(seconds);

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("⏳ Slowmode Updated")
      .setDescription(
        seconds === 0
          ? "✅ Slowmode has been disabled."
          : `✅ Slowmode set to ${seconds} seconds.`
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
          .setColor("#ff0000")
          .setTitle("⏳ Slowmode Log")
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
            },
            {
              name: "⏳ Slowmode",
              value: `${seconds} seconds`,
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