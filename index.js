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
  // Ignore bot messages
  if (message.author.bot) return;

  // Ping command
  if (message.content === '.ping') {
    message.reply('🏓 Pong!');
  }

  // Help command
  if (message.content === '.help') {
    message.reply(
      '👑 **Brotherhood Bot Help**\n' +
      '━━━━━━━━━━━━━━\n' +
      '`.ping` - Check bot status\n' +
      '`.help` - Show help menu\n' +
      '`.profile` - View your profile\n' +
      '`.daily` - Claim daily reward\n' +
      '`.train` - Gain XP\n' +
      '`.fight` - Fight enemies\n' +
      '━━━━━━━━━━━━━━\n' +
      'Developer: @mastermind7313'
    );
  }
});

client.login(process.env.TOKEN);
