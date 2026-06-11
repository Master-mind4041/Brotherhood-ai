const logEmbed = new EmbedBuilder()
  .setColor("#ff0000")
  .setTitle("🧹 Clear Log")
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
      name: "🗑️ Amount",
      value: `${amount}`,
      inline: true
    },
    {
      name: "🆔 Moderator ID",
      value: `${message.author.id}`,
      inline: true
    }
  )
  .setFooter({
    text: `Guild: ${message.guild.name}`
  })
  .setTimestamp();