const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

function getRequiredXP(level) {
  if (level <= 10) return 100;
  if (level <= 20) return 400;
  if (level <= 30) return 700;
  return 1000;
}

module.exports = {
  name: "fight",

  async execute(message) {

    let data = await db.get(`player_${message.author.id}`);

    if (!data) {
      return message.reply(
        "❌ Create your profile first using `.profile`"
      );
    }

    const timeout = 10 * 1000;

    const lastFight = await db.get(`fight_${message.author.id}`);

    if (lastFight && Date.now() - lastFight < timeout) {

      const timeLeft = timeout - (Date.now() - lastFight);

      return message.reply(
        `⏳ You are recovering from battle.\nFight again in **${Math.floor(timeLeft / 1000)}s**`
      );
    }

    let enemyData;

    const chance = Math.random() * 100;

    if (chance <= 50) {

      enemyData = {
        tier: "🟢 Easy",
        name: ["Bandit", "Goblin", "Scout", "Thief"][Math.floor(Math.random() * 4)],
        hp: 50 + Math.floor(Math.random() * 30),
        power: 5 + Math.floor(Math.random() * 5),
        coins: Math.floor(Math.random() * 200) + 100,
        xp: Math.floor(Math.random() * 30) + 20,
        durabilityLoss: 5
      };

    } else if (chance <= 80) {

      enemyData = {
        tier: "🟡 Medium",
        name: ["Knight", "Mercenary", "Assassin", "Raider"][Math.floor(Math.random() * 4)],
        hp: 120 + Math.floor(Math.random() * 50),
        power: 20 + Math.floor(Math.random() * 10),
        coins: Math.floor(Math.random() * 400) + 300,
        xp: Math.floor(Math.random() * 60) + 50,
        durabilityLoss: 7
      };

    } else if (chance <= 95) {

      enemyData = {
        tier: "🔴 Hard",
        name: ["Dark Warrior", "Demon", "Warlord", "Commander"][Math.floor(Math.random() * 4)],
        hp: 250 + Math.floor(Math.random() * 100),
        power: 40 + Math.floor(Math.random() * 20),
        coins: Math.floor(Math.random() * 800) + 700,
        xp: Math.floor(Math.random() * 150) + 100,
        durabilityLoss: 10
      };

    } else {

      enemyData = {
        tier: "⚫ Boss",
        name: ["Dragon", "Shadow King", "Ancient Titan", "Demon Lord"][Math.floor(Math.random() * 4)],
        hp: 500 + Math.floor(Math.random() * 200),
        power: 80 + Math.floor(Math.random() * 30),
        coins: Math.floor(Math.random() * 3500) + 1500,
        xp: Math.floor(Math.random() * 250) + 250,
        durabilityLoss: 15
      };

    }

    const playerStrength =
      data.hp + data.power;

    const enemyStrength =
      enemyData.hp + enemyData.power;

    const winChance = Math.floor(
      (playerStrength /
        (playerStrength + enemyStrength)) * 100
    );

    const win =
      Math.random() * 100 < winChance;

    const coins = enemyData.coins;
    const xp = enemyData.xp;

    let resultText = "";

    if (win) {

      data.coins += coins;
      data.xp += xp;

      resultText =
        `⚔️ You defeated **${enemyData.name}**!\n\n💰 +${coins} Coins\n⚡ +${xp} XP`;

    } else {

      const loss = Math.floor(coins / 2);

      data.coins = Math.max(0, data.coins - loss);

      resultText =
        `💀 You were defeated by **${enemyData.name}**!\n\n❌ Lost ${loss} Coins`;
    }

    let leveledUp = false;
    let levelsGained = 0;

    while (data.xp >= getRequiredXP(data.level)) {

      data.xp -= getRequiredXP(data.level);

      data.level++;

      data.hp += 10;

      data.power += 5;

      leveledUp = true;

      levelsGained++;
    }

    const requiredXP = getRequiredXP(data.level);

    await db.set(`player_${message.author.id}`, data);

    await db.set(`fight_${message.author.id}`, Date.now());

    const embed = new EmbedBuilder()
      .setColor("#8B0000")
      .setAuthor({
        name: `${message.author.username}'s Battle`,
        iconURL: message.author.displayAvatarURL()
      })
      .setTitle("⚔️ Brotherhood Fight")
      .setDescription(resultText)

      .addFields(
        {
          name: "👹 Enemy",
          value: enemyData.name,
          inline: true
        },
        {
          name: "🏷️ Tier",
          value: enemyData.tier,
          inline: true
        },
        {
          name: "🎯 Win Chance",
          value: `${winChance}%`,
          inline: true
        },
        {
          name: "👤 Your Stats",
          value: `❤️ HP: ${data.hp}\n🗡️ Power: ${data.power}`,
          inline: true
        },
        {
          name: "👹 Enemy Stats",
          value: `❤️ HP: ${enemyData.hp}\n🗡️ Power: ${enemyData.power}`,
          inline: true
        },
        {
          name: "💰 Balance",
          value: `${data.coins} Coins`,
          inline: true
        },
        {
          name: "📈 Level",
          value: `${data.level}`,
          inline: true
        },
        {
          name: "⚡ XP",
          value: `${data.xp}/${requiredXP}`,
          inline: true
        },
        {
          name: "🗡️ Power",
          value: `${data.power}`,
          inline: true
        }
      )

      .setFooter({
        text: "⚔️ Brotherhood RPG • Developer - @mastermind7313"
      })

      .setTimestamp();

    if (leveledUp) {

      embed.addFields({
        name: "🎉 LEVEL UP!",
        value: `You gained **${levelsGained} level(s)**!\nCurrent Level: **${data.level}**`
      });

    }

    message.channel.send({
      embeds: [embed]
    });

  }
};