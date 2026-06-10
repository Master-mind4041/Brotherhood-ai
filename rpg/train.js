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
  name: "train",

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

    const timeout = 60 * 1000;

    const lastTrain = await db.get(`train_${message.author.id}`);

    if (lastTrain && Date.now() - lastTrain < timeout) {

      const timeLeft = timeout - (Date.now() - lastTrain);

      const seconds = Math.floor(timeLeft / 1000);

      return message.reply(
        `⏳ You are tired.\nTrain again in ${seconds}s`
      );
    }

    const xpGain = Math.floor(Math.random() * 40) + 20;

    data.xp += xpGain;

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

    await db.set(`train_${message.author.id}`, Date.now());

    const trainingTexts = [
      "⚔️ You trained with Brotherhood warriors.",
      "🏹 You practiced your battle skills.",
      "🛡️ You survived a hard training session.",
      "🔥 You became stronger after intense combat training."
    ];

    const randomText =
      trainingTexts[
        Math.floor(Math.random() * trainingTexts.length)
      ];

    const embed = new EmbedBuilder()
      .setColor("#8B0000")
      .setAuthor({
        name: `${message.author.username}'s Training Session`,
        iconURL: message.author.displayAvatarURL()
      })
      .setTitle("🏋️ Brotherhood Training")
      .setDescription(
        `${randomText}\n\n⚡ XP Earned: **${xpGain}**`
      )

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