const fs = require("fs");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();



// ================= COMMANDS =================

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

  const command =
    require(`./commands/${file}`);

  client.commands.set(
    command.name,
    command
  );
}



// ================= RPG COMMANDS =================

if (fs.existsSync("./rpg")) {

  const rpgFiles = fs
    .readdirSync("./rpg")
    .filter(file => file.endsWith(".js"));

  for (const file of rpgFiles) {

    const command =
      require(`./rpg/${file}`);

    client.commands.set(
      command.name,
      command
    );
  }
}



// ================= READY EVENT =================

client.once("ready", () => {

  console.log(
    `✅ Logged in as ${client.user.tag}`
  );

});



// ================= MESSAGE EVENT =================

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  if (!message.guild) return;

  const prefix =
    await db.get(
      `prefix_${message.guild.id}`
    ) || ".";

  if (!message.content.startsWith(prefix))
    return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  const commandName =
    args.shift().toLowerCase();

  const command =
    client.commands.get(commandName);

  if (!command) return;

  try {

    await command.execute(
      message,
      args,
      client
    );

  } catch (error) {

    console.error(error);

    message.channel.send(
      "❌ Error while running command."
    );
  }

});



// ================= LOGIN =================

client.login(process.env.TOKEN);