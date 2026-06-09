const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "inventory",

  aliases: ["inv"],

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

    const items =
      data.inventory.length > 0
        ? data.inventory.join("\n")
        : "No items found.";

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("🎒 Brotherhood Inventory")
      .setDescription(items)
      .setThumbnail(message.author.displayAvatarURL())
      .setFooter({
        text: "Developer - @mastermind7313"
      });

    message.channel.send({
      embeds: [embed]
    });

  }
};