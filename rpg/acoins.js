const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "addcoins",

  async execute(message, args) {

    if (message.author.id !== "967804605931069461")
      return;

    const user =
      message.mentions.users.first();

    const amount =
      parseInt(args[1]);

    if (!user || !amount)
      return message.reply(
        "Usage: .addcoins @user amount"
      );

    let data =
      await db.get(`player_${user.id}`);

    if (!data)
      return message.reply(
        "Player not found."
      );

    data.coins += amount;

    await db.set(
      `player_${user.id}`,
      data
    );

    message.reply(
      `✅ Added ${amount} coins to ${user.username}`
    );
  }
};