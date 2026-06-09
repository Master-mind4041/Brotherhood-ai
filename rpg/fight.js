const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

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

    // ================= COOLDOWN =================

    const timeout = 10 * 1000;

    const lastFight = await db.get(`fight_${message.author.id}`);

    if (lastFight && Date.now() - lastFight < timeout) {

      const timeLeft = timeout - (Date.now() - lastFight);

      const seconds = Math.floor(timeLeft / 1000);

      return message.reply(
        `⏳ You are tired after fighting.\nFight again in ${seconds}s`
      );
    }

    // ================= ENEMY =================

    const enemies = [
      "Bandit",
      "Knight",
      "Assassin",
      "Monster",
      "Dark Warrior"
    ];

    const enemy =
      enemies[Math.floor(Math.random() * enemies.length)];

    // ================= REWARDS =================

    const win = Math.random() < 0.7;

    let coins = Math.floor(Math.random() * 300) + 100;

    let xp = Math.floor(Math.random() * 50) + 25;

    let resultText = "";

    if (win) {

      data.coins += coins;
      data.xp += xp;

      resultText =
        `⚔️ You defeated the **${enemy}**!\n\n💰 +${coins} coins\n⚡ +${xp} XP`;

    } else {

      const loss = Math.floor(coins / 2);

      data.coins -= loss;

      if (data.coins < 0) data.coins = 0;

      resultText =
        `💀 You were defeated by the **${enemy}**!\n\n❌ Lost ${loss} coins`;
    }

    // ================= LEVEL SYSTEM =================

    let requiredXP = 150;

    if (data.level >= 11) {
      requiredXP = 400;
    }

    if (data.level >= 21) {
      requiredXP = 1000;
    }

    let leveledUp = false;

    if (data.xp >= requiredXP) {

      data.level += 1;

      data.xp -= requiredXP;

      data.hp += 10;

      data.power += 5;

      leveledUp = true;
    }

    // ================= SAVE =================

    await db.set(`player_${message.author.id}`, data);

    await db.set(`fight_${message.author.id}`, Date.now());

    // ================= EMBED =================

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("⚔️ Brotherhood Fight")
      .setDescription(resultText)

      .addFields(
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
        }
      )

      .setFooter({
        text: "Developer - @mastermind7313"
      });

    if (leveledUp) {

      embed.addFields({
        name: "🎉 Level Up!",
        value: `You reached level ${data.level}!`,
        inline: false
      });

    }

    message.channel.send({
      embeds: [embed]
    });

  }
};