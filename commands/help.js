module.exports = {
  name: "help",
  execute(message) {
    message.reply(
`👑 **BROTHERHOOD HELP PANEL** 👑

📌 General:
.ping - Check bot status
.help - Show this panel

🛡️ Moderation:
.ban
.kick
.purge
.mute
.unmute

🎭 Fun:
.slap
.punch
.hug
.kill

⚔️ RPG:
.profile
.daily
.weekly
.train
.shop
.fight
.inventory
.trade

💖 Charm System:
.charm
.charmhelp

⚙️ Dev:
.addcoins
.addlevel

🚀 Brotherhood RPG v2.0`
    );
  }
};
