 const express = require("express");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");

// Keep-alive web server for UptimeRobot
const app = express();

app.get("/", (req, res) => {
  res.send("Brotherhood bot is alive!");
});

app.listen(3000, () => {
  console.log("Web server running");
});

// Discord bot
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

// Command handler
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(".")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const name = args.shift().toLowerCase();

  const command = client.commands.get(name);
  if (!command) return;

  command.execute(message, args, client);
});

// Bot ready
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Login
client.login(process.env.TOKEN);