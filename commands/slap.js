module.exports = {
  name: "slap",
  execute(message) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ Mention someone to slap! Example: `.slap @user`");
    }

    const gifs = [
      "https://cdn.discordapp.com/attachments/1504906686895357982/1506581491977551902/image0.gif?ex=6a13661a&is=6a12149a&hm=279b92fa8179537d8cd8b3b2e9e03eacf25204b2a784b2813ab88d6aa0991c1d&",
      "https://cdn.discordapp.com/attachments/1504906686895357982/1506581354194665534/image0.gif?ex=6a1365f9&is=6a121479&hm=6557f347be8429e396473094b618475d1db2b71c04a9022ac28e97788f043b20&",
      "https://cdn.discordapp.com/attachments/1504906686895357982/1506581319654834246/image0.gif?ex=6a1365f1&is=6a121471&hm=79fe81e4d876d793fa5bff08cd6e1dd11f3cad9b4ab36fb3e4ff4d5ac35773e2&"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    message.reply({
      embeds: [
        {
          color: 0xff0000,
          title: "💥 Slap!",
          description: `${message.author} slapped ${user}!`,
          image: {
            url: randomGif
          },
          footer: {
            text: "Developer - @mastermind7313"
          },
          timestamp: new Date()
        }
      ]
    });
  }
};