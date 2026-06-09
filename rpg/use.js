const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "use",
  async execute(message, args) {
    const userId = message.author.id;
    const itemName = args.join(" ").toLowerCase();

    if (!itemName) {
      return message.reply("🧪 Specify an item to use!");
    }

    let inv = db.get(`inventory_${userId}`) || [];

    let itemIndex = inv.findIndex(i => i.name.toLowerCase() === itemName);

    if (itemIndex === -1) {
      return message.reply("❌ You don't own this item!");
    }

    let item = inv[itemIndex];

    let embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🧪 Item Used");

    // 🧪 HEALTH POTION
    if (item.type === "potion") {
      let hp = db.get(`hp_${userId}`) || 100;

      let healAmount = 30;

      hp += healAmount;
      if (hp > 100) hp = 100;

      db.set(`hp_${userId}`, hp);

      embed.setDescription(`You used **${item.name}** and restored ❤️ ${healAmount} HP.`);
    }

    // ⚡ XP BOOST ITEM
    else if (item.type === "boost") {
      let xp = db.get(`xp_${userId}`) || 0;

      let boost = 50;

      db.add(`xp_${userId}`, boost);

      embed.setDescription(`⚡ You used **${item.name}** and gained +${boost} XP.`);
    }

    // ❌ UNKNOWN ITEM TYPE
    else {
      return message.reply("❌ This item cannot be used!");
    }

    // Reduce quantity
    item.qty -= 1;

    if (item.qty <= 0) {
      inv.splice(itemIndex, 1);
    }

    db.set(`inventory_${userId}`, inv);

    message.reply({ embeds: [embed] });
  }
};