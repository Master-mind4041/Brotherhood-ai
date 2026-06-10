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

    const timeout = 10 * 1000;

    const lastFight = await db.get(`fight_${message.author.id}`);

    if (lastFight && Date.now() - lastFight < timeout) {

      const timeLeft = timeout - (Date.now() - lastFight);

      return message.reply(
        `⏳ You are recovering from battle.\nFight again in **${Math.floor(timeLeft / 1000)}s**`
      );
    }

    let enemyTier;
    let enemy;
    let coins;
    let xp;

    const chance = Math.random() * 100;

    if (chance <= 50) {

      enemyTier = "🟢 Easy";

      const enemies = ["Bandit", "Goblin", "Scout", "Thief"];

      enemy = enemies[Math.floor(Math.random() * enemies.length)];

      coins = Math.floor(Math.random() * 200) + 100;
      xp = Math.floor(Math.random() * 30) + 20;

    } else if (chance <= 80) {

      enemyTier = "🟡 Medium";

      const enemies = ["Knight", "Mercenary", "Assassin", "Raider"];

      enemy = enemies[Math.floor(Math.random() * enemies.length)];

      coins = Math.floor(Math.random() * 400) + 300;
      xp = Math.floor(Math.random() * 60) + 50;

    } else if (chance <= 95) {

      enemyTier = "🔴 Hard";

      const enemies = ["Dark Warrior", "Demon", "Warlord", "Commander"];

      enemy = enemies[Math.floor(Math.random() * enemies.length)];

      coins = Math.floor(Math.random() * 800) + 700;
      xp = Math.floor(Math.random() * 150) + 100;

    } else {

      enemyTier = "⚫ Boss";

      const enemies = ["Dragon", "Shadow King", "Ancient Titan", "Demon Lord"];

      enemy = enemies[Math.floor(Math.random() * enemies.length)];

      coins = Math.floor(Math.random() * 3500) + 1500;
      xp = Math.floor(Math.random() * 250) + 250;
    }

    const winChance = 70 + Math.min(data.level, 20);

    const win = Math.random() * 100 < winChance;

    let resultText;

    if (win) {

      data.coins += coins;
      data.xp += xp;

      resultText =
        `⚔️ You defeated **${enemy}**!\n\n💰 +${coins} Coins\n⚡ +${xp} XP`;

    } else {

      const loss = Math.floor(coins / 2);

      data.coins = Math.max(0, data.coins - loss);

      resultText =
        `💀 You were defeated by **${enemy}**!\n\n❌ Lost ${loss} Coins`;
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
          value: `${enemy}`,
          inline: true
        },
        {
          name: "🏷️ Tier",
          value: enemyTier,
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
          name: "💰 Coins",
          value: `${data.coins}`,
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