const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "nuke",

  async execute(message) {

    if (
      !message.member.permissions.has("Administrator") &&
      message.author.id !== "967804605931069461"
    ) {
      return message.reply(
        "❌ You need Administrator permission to use this command."
      );
    }

    const oldChannel = message.channel;

    const logChannelId =
      await db.get(`logchannel_${message.guild.id}`);

    const newChannel = await oldChannel.clone();

    await newChannel.setPosition(oldChannel.position);

    await oldChannel.delete();

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("💥 Channel Nuked")
      .setDescription(
        `This channel was nuked by ${message.author}`
      )
      .setTimestamp();

    await newChannel.send({
      embeds: [embed]
    });

    if (logChannelId) {

      const logChannel =
        message.guild.channels.cache.get(logChannelId);

      if (logChannel) {

        const logEmbed = new EmbedBuilder()
          .setColor("#ff0000")
          .setTitle("💥 Nuke Log")
          .addFields(
            {
              name: "👮 Moderator",
              value: `${message.author}`,
              inline: true
            },
            {
              name: "📍 Channel",
              value: `${oldChannel.name}`,
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