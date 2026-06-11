const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "setlog",

  async execute(message) {

    // Your Discord ID
    if (message.author.id !== "967804605931069461") {
      return message.reply("❌ Developer only command.");
    }

    const channel = message.mentions.channels.first();

    if (!channel) {
      return message.reply(
        "❌ Usage: .setlog #channel"
      );
    }

    await db.set(
      `logchannel_${message.guild.id}`,
      channel.id
    );

    message.reply(
      `✅ Log channel set to ${channel}`
    );
  }
};