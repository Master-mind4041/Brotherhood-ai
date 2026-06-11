const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "setlog",

  async execute(message) {

    // Owner Only
    if (message.author.id !== "967804605931069461") {
      return message.reply("❌ Owner only command.");
    }

    if (message.deletable) {
      message.delete().catch(() => {});
    }

    const channel = message.mentions.channels.first();

    if (!channel) {
      return message.channel.send(
        "❌ Usage: .setlog #channel"
      );
    }

    await db.set(
      `logchannel_${message.guild.id}`,
      channel.id
    );

    message.channel.send(
      `✅ Log channel set to ${channel}`
    );
  }
};