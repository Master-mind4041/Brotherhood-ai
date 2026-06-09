const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "weekly",

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

    const timeout = 7 * 24 * 60 * 60 * 1000;

    const lastWeekly = await db.get(`weekly_${message.author.id}`);

    if (lastWeekly && Date.now() - lastWeekly < timeout) {

      const timeLeft = timeout - (Date.now() - lastWeekly);

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

      return message.reply(
        `⏳ You already claimed your weekly reward.\nCome back in ${days} day(s).`
      );
    }

    const reward = Math.floor(Math.random() * 5000) + 5000;

    data.coins += reward;
    data.xp += 100;

    await db.set(`player_${message.author.id}`, data);

    await db.set(`weekly_${message.author.id}`, Date.now());

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("🎁 Weekly Reward")
      .setDescription(
        `💰 You received **${reward} coins**!\n⚡ +100 XP added`
      )
      .setFooter({
        text: "Developer - @mastermind7313"
      });

    message.channel.send({
      embeds: [embed]
    });

  }
};