const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "sell",
  async execute(message, args) {
    const userId = message.author.id;
    const itemName = args.join(" ");

    if (!itemName) return message.reply("💸 Specify an item to sell!");

    let inv = db.get(`inventory_${userId}`) || [];

    let itemIndex = inv.findIndex(i => i.name.toLowerCase() === itemName.toLowerCase());

    if (itemIndex === -1) {
      return message.reply("❌ You don't own this item!");
    }

    let item = inv[itemIndex];

    // Example base prices (same as shop reference)
    const basePrices = {
      "health potion": 100,
      "sword": 500,
      "armor": 700
    };

    let basePrice = basePrices[item.name.toLowerCase()] || 50;

    let sellPrice = Math.floor(basePrice * 0.7); // 70% rule

    // Update quantity
    item.qty -= 1;

    if (item.qty <= 0) {
      inv.splice(itemIndex, 1);
    }

    db.set(`inventory_${userId}`, inv);

    db.add(`coins_${userId}`, sellPrice);

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("💸 Item Sold")
      .setDescription(`Sold **${item.name}** for 💰 ${sellPrice}`)
      .setFooter({ text: "Brotherhood RPG Economy" });

    message.reply({ embeds: [embed] });
  }
};