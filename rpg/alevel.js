const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "alevel",

  async execute(message, args) {

    if (message.author.id !== "967804605931069461")
      return;

    const user =
      message.mentions.users.first();

    const amount =
      parseInt(args[1]);

    if (!user || !amount)
      return message.reply(
        "Usage: .addlevel @user amount"
      );

    let data =
      await db.get(`player_${user.id}`);

    if (!data)
      return message.reply(
        "Player not found."
      );

    data.level += amount;

    data.hp += amount * 10;

    data.power += amount * 5;

    await db.set(
      `player_${user.id}`,
      data
    );

    message.reply(
      `✅ Added ${amount} levels to ${user.username}`
    );
  }
};