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
  name: "profile",

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
      .setColor("#8B0000")
      .setAuthor({
        name: `${message.author.username}'s Brotherhood Profile`,
        iconURL: message.author.displayAvatarURL()
      })
      .setThumbnail(message.author.displayAvatarURL())

      .addFields(
        {
          name: "⚔️ Warrior Stats",
          value:
            `📈 Level: **${data.level}**\n` +
            `⚡ XP: **${data.xp}/${getRequiredXP(data.level)}**\n` +
            `❤️ HP: **${data.hp}**\n` +
            `🗡️ Power: **${data.power}**`,
          inline: true
        },
        {
          name: "💰 Economy",
          value:
            `Coins: **${data.coins}**\n` +
            `Inventory: **${data.inventory.length} Items**`,
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