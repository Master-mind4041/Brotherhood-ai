client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const prefix = ".";
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  console.log("CMD DETECTED:", cmd); // DEBUG

  const command = client.commands.get(cmd);
  if (!command) return;

  command.execute(message, args, client);
});
