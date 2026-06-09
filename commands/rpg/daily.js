const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "daily",

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

    const timeout = 24 * 60 * 60 * 1000;

    const lastDaily = await db.get(`daily_${message.author.id}`);

    if (lastDaily && Date.now() - lastDaily < timeout) {

      const timeLeft = timeout - (Date.now() - lastDaily);

      const hours = Math.floor(timeLeft / (1000 * 60 * 60));

      const minutes = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
      );

      return message.reply(
        `⏳ You already claimed your daily reward.\nCome back in ${hours}h ${minutes}m`
      );
    }

    const reward = Math.floor(Math.random() * 500) + 500;

    data.coins += reward;
    data.xp += 25;

    await db.set(`player_${message.author.id}`, data);

    await db.set(`daily_${message.author.id}`, Date.now());

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("🎁 Daily Reward")
      .setDescription(
        `💰 You received **${reward} coins**!\n⚡ +25 XP added`
      )
      .setFooter({
        text: "Developer - @mastermind7313"
      });

    message.channel.send({
      embeds: [embed]
    });

  }
};