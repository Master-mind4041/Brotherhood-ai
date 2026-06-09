const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "buy",
  async execute(message, args) {
    const userId = message.author.id;
    const itemName = args.join(" ");

    if (!itemName) return message.reply("🛒 Specify an item to buy!");

    // Example shop data (you can expand later)
    const shopItems = {
      "health potion": { price: 100, type: "potion", rarity: "common" },
      "sword": { price: 500, type: "weapon", rarity: "rare" },
      "armor": { price: 700, type: "armor", rarity: "rare" }
    };

    const item = shopItems[itemName.toLowerCase()];
    if (!item) return message.reply("❌ Item not found in shop!");

    let coins = db.get(`coins_${userId}`) || 0;

    if (coins < item.price) {
      return message.reply("💰 Not enough coins!");
    }

    // Deduct coins
    db.subtract(`coins_${userId}`, item.price);

    // Inventory handling
    let inv = db.get(`inventory_${userId}`) || [];

    let existing = inv.find(i => i.name.toLowerCase() === itemName.toLowerCase());

    if (existing) {
      existing.qty += 1;
    } else {
      inv.push({
        name: itemName,
        type: item.type,
        rarity: item.rarity,
        qty: 1
      });
    }

    db.set(`inventory_${userId}`, inv);

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("🛒 Purchase Successful")
      .setDescription(`You bought **${itemName}** for 💰 ${item.price}`)
      .setFooter({ text: "Brotherhood RPG Shop" });

    message.reply({ embeds: [embed] });
  }
};