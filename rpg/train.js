const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

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
      .setColor("#ff0000")
      .setTitle("🏋️ Training Complete")
      .setDescription(
        `${randomText}\n\n⚡ +${xpGain} XP`
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