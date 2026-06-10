let enemyData;

const chance = Math.random() * 100;

if (chance <= 50) {

  enemyData = {
    tier: "🟢 Easy",
    name: ["Bandit", "Goblin", "Scout", "Thief"][Math.floor(Math.random() * 4)],
    hp: 50 + Math.floor(Math.random() * 30),
    power: 5 + Math.floor(Math.random() * 5),
    coins: Math.floor(Math.random() * 200) + 100,
    xp: Math.floor(Math.random() * 30) + 20,
    durabilityLoss: 5
  };

} else if (chance <= 80) {

  enemyData = {
    tier: "🟡 Medium",
    name: ["Knight", "Mercenary", "Assassin", "Raider"][Math.floor(Math.random() * 4)],
    hp: 120 + Math.floor(Math.random() * 50),
    power: 20 + Math.floor(Math.random() * 10),
    coins: Math.floor(Math.random() * 400) + 300,
    xp: Math.floor(Math.random() * 60) + 50,
    durabilityLoss: 7
  };

} else if (chance <= 95) {

  enemyData = {
    tier: "🔴 Hard",
    name: ["Dark Warrior", "Demon", "Warlord", "Commander"][Math.floor(Math.random() * 4)],
    hp: 250 + Math.floor(Math.random() * 100),
    power: 40 + Math.floor(Math.random() * 20),
    coins: Math.floor(Math.random() * 800) + 700,
    xp: Math.floor(Math.random() * 150) + 100,
    durabilityLoss: 10
  };

} else {

  enemyData = {
    tier: "⚫ Boss",
    name: ["Dragon", "Shadow King", "Ancient Titan", "Demon Lord"][Math.floor(Math.random() * 4)],
    hp: 500 + Math.floor(Math.random() * 200),
    power: 80 + Math.floor(Math.random() * 30),
    coins: Math.floor(Math.random() * 3500) + 1500,
    xp: Math.floor(Math.random() * 250) + 250,
    durabilityLoss: 15
  };

}
      
         