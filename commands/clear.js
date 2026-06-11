const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "clear",

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
    const amount = parseInt(args[0]);

    if (!amount || amount < 1 || amount > 100) {
      return message.reply(
        "❌ Usage: .clear <1-100>"
      );
    }

    await message.channel.bulkDelete(amount, true);

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("🧹 Messages Cleared")
      .setDescription(
        `Successfully deleted **${amount}** messages.`
      )
      .setFooter({
        text: `Moderator: ${message.author.tag}`
      })
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
          .setTitle("🧹 Clear Log")
          .addFields(
            {
              name: "Moderator",
              value: `${message.author.tag}`,
              inline: true
            },
            {
              name: "Messages Deleted",
              value: `${amount}`,
              inline: true
            },
            {
              name: "Channel",
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