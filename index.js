const fs = require("fs");

const {
  Client,
  GatewayIntentBits,
  Collection
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = ".";

client.commands = new Collection();


// ================= COMMAND HANDLER =================

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {

  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {

    const command = require(`./commands/${folder}/${file}`);

    client.commands.set(command.name, command);
  }
}


// ================= READY EVENT =================

client.once("ready", () => {

  console.log(`${client.user.tag} is online!`);

});


// ================= MESSAGE EVENT =================

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {

    command.execute(message, args);

  } catch (err) {

    console.error(err);

    message.reply("❌ Error executing command.");

  }

});


// ================= LOGIN =================

client.login(process.env.TOKEN);