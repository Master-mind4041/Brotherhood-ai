const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "profile",

  async execute(message) {

    let data = await db.get(`player_${message.author.id}`);

    if (!data) {

      data = {
        coins: 500,
        xp: 0,
        level: 1,
        hp: 100,
        power: 10,
        inventory: []
      };

      await db.set(`player_${message.author.id}`, data);
    }

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("⚔️ Brotherhood Profile")
      .setThumbnail(message.author.displayAvatarURL())

      .addFields(
        {
          name: "💰 Coins",
          value: `${data.coins}`,
          inline: true
        },
        {
          name: "📈 Level",
          value: `${data.level}`,
          inline: true
        },
        {
          name: "⚡ XP",
          value: `${data.xp}`,
          inline: true
        },
        {
          name: "❤️ HP",
          value: `${data.hp}`,
          inline: true
        },
        {
          name: "🗡️ Power",
          value: `${data.power}`,
          inline: true
        },
        {
          name: "🎒 Inventory",
          value: `${data.inventory.length} items`,
          inline: true
        }
      )

      .setFooter({
        text: "Developer - @mastermind7313"
      });

    message.channel.send({
      embeds: [embed]
    });

  }
};