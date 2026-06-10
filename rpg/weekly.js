const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "weekly",

  async execute(message) {

    let player = await db.get(`player_${message.author.id}`);

    if (!player) {
      player = {
        coins: 500,
        xp: 0,
        level: 1,
        hp: 100,
        power: 10,
        inventory: []
      };

      await db.set(`player_${message.author.id}`, player);
    }

    const cooldown = 7 * 24 * 60 * 60 * 1000;

    const lastWeekly = await db.get(`weekly_${message.author.id}`);

    if (lastWeekly) {

      const remaining = cooldown - (Date.now() - lastWeekly);

      if (remaining > 0) {

        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remaining % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
        );

        return message.reply(
          `⏳ You already claimed your weekly reward.\nCome back in **${days}d ${hours}h**`
        );
      }
    }

    const reward = Math.floor(Math.random() * 5000) + 5000;
    const xpReward = 100;

    player.coins += reward;
    player.xp += xpReward;

    await db.set(`player_${message.author.id}`, player);

    // Save cooldown timestamp
    await db.set(`weekly_${message.author.id}`, Date.now());

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("🎁 Weekly Reward")
      .setDescription(
        `💰 Coins Earned: **${reward}**\n⚡ XP Earned: **${xpReward}**`
      )
      .setFooter({
        text: "Developer - @mastermind7313"
      });

    message.channel.send({
      embeds: [embed]
    });

  }
};