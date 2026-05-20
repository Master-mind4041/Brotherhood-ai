const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  // Ping command
  if (message.content === '.ping') {
    message.reply('🏓 Pong! Brotherhood Bot is online.');
  }

  // Help command
  if (message.content === '.help') {
    message.reply(
      '👑 **BROTHERHOOD BOT HELP PANEL** 👑\n' +
      '━━━━━━━━━━━━━━━━━━━━━━\n\n' +

      '📌 **GENERAL COMMANDS**\n' +
      '`.ping` - Check bot status\n' +
      '`.help` - Show this help panel\n\n' +

      '🛡️ **MODERATION COMMANDS**\n' +
      '`.ban @user`\n' +
      '`.kick @user`\n' +
      '`.clear <number>`\n' +
      '`.mute @user`\n' +
      '`.unmute @user`\n\n' +

      '🎭 **FUN COMMANDS**\n' +
      '`.slap @user`\n' +
      '`.punch @user`\n' +
      '`.bite @user`\n' +
      '`.kill @user`\n' +
      '`.hug @user`\n\n' +

      '⚔️ **RPG COMMANDS**\n' +
      '`.profile`\n' +
      '`.daily`\n' +
      '`.weekly`\n' +
      '`.train`\n' +
      '`.level`\n' +
      '`.shop`\n' +
      '`.buy`\n' +
      '`.inventory`\n' +
      '`.sell`\n' +
      '`.fight`\n' +
      '`.bm`\n' +
      '`.trade`\n' +
      '`.equip`\n' +
      '`.advisor`\n' +
      '`.advsell`\n' +
      '`.lootcrate`\n\n' +

      '💖 **CHARM COMMANDS**\n' +
      '`.charmhelp`\n' +
      '`.charm`\n\n' +

      '⚙️ **DEVELOPER COMMANDS**\n' +
      '`.addcoins`\n' +
      '`.removecoins`\n' +
      '`.addlevel`\n' +
      '`.setinventory`\n' +
      '`.refreshbm`\n\n' +

      '━━━━━━━━━━━━━━━━━━━━━━\n' +
      '👨‍💻 Developer: **@mastermind7313**\n' +
      '🚀 Brotherhood RPG v1.0'
    );
  }
});

client.login(process.env.TOKEN);
