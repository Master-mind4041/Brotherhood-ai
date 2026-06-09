const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = ".";

client.commands = new Collection();



// ================= ACTION COMMANDS =================

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}



// ================= RPG COMMANDS =================

const rpgFiles = fs
  .readdirSync("./rpg")
  .filter(file => file.endsWith(".js"));

for (const file of rpgFiles) {
  const command = require(`./rpg/${file}`);
  client.commands.set(command.name, command);
}



// ================= MESSAGE EVENT =================

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("❌ Error while running command.");
  }
});



client.login(process.env.TOKEN);