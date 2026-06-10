const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

const shopItems = {

  // Weapons
  "wooden sword": {
    type: "weapon",
    name: "Wooden Sword",
    price: 500,
    power: 5,
    durability: 50
  },

  "iron sword": {
    type: "weapon",
    name: "Iron Sword",
    price: 1500,
    power: 10,
    durability: 100
  },

  "steel sword": {
    type: "weapon",
    name: "Steel Sword",
    price: 4000,
    power: 20,
    durability: 200
  },

  "flame katana": {
    type: "weapon",
    name: "Flame Katana",
    price: 8000,
    power: 35,
    durability: 350
  },

  "shadow blade": {
    type: "weapon",
    name: "Shadow Blade",
    price: 15000,
    power: 50,
    durability: 500
  },

  "dragon slayer": {
    type: "weapon",
    name: "Dragon Slayer",
    price: 30000,
    power: 75,
    durability: 750
  },

  // Armor

  "leather armor": {
    type: "armor",
    name: "Leather Armor",
    price: 2000,
    hp: 25,
    durability: 100
  },

  "iron armor": {
    type: "armor",
    name: "Iron Armor",
    price: 5000,
    hp: 50,
    durability: 250
  },

  "knight armor": {
    type: "armor",
    name: "Knight Armor",
    price: 10000,
    hp: 100,
    durability: 500
  },

  "dragon armor": {
    type: "armor",
    name: "Dragon Armor",
    price: 25000,
    hp: 250,
    durability: 1000
  },

  // Potions

  "small potion": {
    type: "potion",
    name: "Small Potion",
    price: 300,
    heal: 25
  },

  "medium potion": {
    type: "potion",
    name: "Medium Potion",
    price: 750,
    heal: 50
  },

  "large potion": {
    type: "potion",
    name: "Large Potion",
    price: 1500,
    heal: 100
  },

  "mega potion": {
    type: "potion",
    name: "Mega Potion",
    price: 5000,
    heal: 250
  }
};

module.exports = {
  name: "buy",

  async execute(message, args) {

    let data = await db.get(`player_${message.author.id}`);

    if (!data) {
      return message.reply(
        "❌ Create your profile first using `.profile`"
      );
    }

    if (data.level < 10) {
      return message.reply(
        `🔒 Shop unlocks at Level 10.\nCurrent Level: ${data.level}`
      );
    }

    const itemName = args.join(" ").toLowerCase();

    if (!itemName) {
      return message.reply(
        "❌ Usage: `.buy <item name>`"
      );
    }

    const item = shopItems[itemName];

    if (!item) {
      return message.reply(
        "❌ Item not found in shop."
      );
    }

    if (data.coins < item.price) {
      return message.reply(
        `❌ You need ${item.price} coins.`
      );
    }

    data.coins -= item.price;

    if (!data.inventory) {
      data.inventory = [];
    }

    const newItem = {
      ...item
    };

    if (item.durability) {
      newItem.maxDurability = item.durability;
    }

    data.inventory.push(newItem);

    await db.set(
      `player_${message.author.id}`,
      data
    );

    const embed = new EmbedBuilder()
      .setColor("#8B0000")
      .setTitle("🛒 Purchase Successful")

      .setDescription(
        `You purchased **${item.name}**`
      )

      .addFields(
        {
          name: "💰 Cost",
          value: `${item.price}`,
          inline: true
        },
        {
          name: "💳 Remaining Coins",
          value: `${data.coins}`,
          inline: true
        },
        {
          name: "🎒 Inventory",
          value: `${data.inventory.length} Items`,
          inline: true
        }
      )

      .setFooter({
        text: "⚔️ Brotherhood RPG • Developer - @mastermind7313"
      })

      .setTimestamp();

    message.channel.send({
      embeds: [embed]
    });

  }
};