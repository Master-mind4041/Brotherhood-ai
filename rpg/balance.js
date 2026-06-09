const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "balance",

  aliases: ["bal"],

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

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("💰 Brotherhood Balance")
      .setDescription(
        `You currently have **${data.coins} coins**`
      )
      .setThumbnail(message.author.displayAvatarURL())
      .setFooter({
        text: "Developer - @mastermind7313"
      });

    message.channel.send({
      embeds: [embed]
    });

  }
};