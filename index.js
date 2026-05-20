const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// Load commands
const files = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

for (const file of files) {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.name, cmd);
}

// Handler
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(".")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const name = args.shift().toLowerCase();

  const command = client.commands.get(name);
  if (!command) return;

  command.execute(message, args, client);
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
