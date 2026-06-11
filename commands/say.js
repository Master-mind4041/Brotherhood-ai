const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "say",

  async execute(message, args) {

    if (
      !message.member.permissions.has("Administrator") &&
      message.author.id !== "967804605931069461"
    ) {
      return message.reply(
        "❌ You need Administrator permission to use this command."
      );
    }

    const text = args.join(" ");

    if (!text) {
      return message.reply(
        "❌ Usage: .say <message>"
      );
    }

    message.delete().catch(() => {});

    await message.channel.send(text);

    // LOG SYSTEM

    const logChannelId =
      await db.get(`logchannel_${message.guild.id}`);

    if (logChannelId) {

      const logChannel =
        message.guild.channels.cache.get(logChannelId);

      if (logChannel) {

        const logEmbed = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle("📢 Say Command Log")
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
              name: "💬 Message",
              value: text.length > 1024
                ? text.slice(0, 1021) + "..."
                : text
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