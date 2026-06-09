const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "shop",

  execute(message) {

    const embed = new EmbedBuilder()

      .setColor("#ff0000")

      .setTitle("🛒 Brotherhood Shop")

      .setDescription(
`🗡️ **Weapons**
━━━━━━━━━━━━━━
⚔️ Wooden Sword — 500 coins
🛡️ Iron Sword — 1500 coins
🔥 Flame Katana — 5000 coins

🧪 **Healing Items**
━━━━━━━━━━━━━━
🍎 Small Potion — 300 coins
💉 Large Potion — 1000 coins

📦 Buy Items:
.buy <item name>

Example:
.buy wooden sword`
      )

      .setFooter({
        text: "Developer - @mastermind7313"
      });

    message.channel.send({
      embeds: [embed]
    });

  }
};