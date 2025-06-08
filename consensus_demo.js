// consensus_mechanism_simulation.js

console.log("Consensus Mechanism Simulation\n");

// Utility: Generate random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1. Proof of Work (PoW)
const powValidators = [
  { name: "Alice", power: getRandomInt(10, 100) },
  { name: "Bob", power: getRandomInt(10, 100) },
  { name: "Carol", power: getRandomInt(10, 100) },
];

const powWinner = powValidators.reduce((max, val) =>
  val.power > max.power ? val : max
);

console.log(" Proof of Work (PoW):");
console.log("Logic: Validator with highest computational power wins.");
powValidators.forEach(v => console.log(`${v.name}: ${v.power} power`));
console.log(` Selected: ${powWinner.name} (Highest power: ${powWinner.power})\n`);


//  2. Proof of Stake (PoS)
const posValidators = [
  { name: "Dave", stake: getRandomInt(10, 100) },
  { name: "Eve", stake: getRandomInt(10, 100) },
  { name: "Frank", stake: getRandomInt(10, 100) },
];

const posWinner = posValidators.reduce((max, val) =>
  val.stake > max.stake ? val : max
);

console.log(" Proof of Stake (PoS):");
console.log("Logic: Validator with highest amount of stake wins.");
posValidators.forEach(v => console.log(`${v.name}: ${v.stake} tokens staked`));
console.log(` Selected: ${posWinner.name} (Highest stake: ${posWinner.stake})\n`);


//  3. Delegated Proof of Stake (DPoS)

const dposCandidates = ["Grace", "Heidi", "Ivan"];
const votes = {
  Grace: getRandomInt(1, 100),
  Heidi: getRandomInt(1, 100),
  Ivan: getRandomInt(1, 100),
};

const dposWinner = Object.keys(votes).reduce((max, name) =>
  votes[name] > votes[max] ? name : max
);

console.log("Delegated Proof of Stake (DPoS):");
console.log("Logic: Most voted delegate by stakeholders is selected.");
dposCandidates.forEach(name => console.log(`${name}: ${votes[name]} votes`));
console.log(`Selected: ${dposWinner} (Most votes: ${votes[dposWinner]})\n`);


//  Final Summary
console.log("Final Summary:");
console.log(`PoW Winner: ${powWinner.name} (Power: ${powWinner.power})`);
console.log(`PoS Winner: ${posWinner.name} (Stake: ${posWinner.stake})`);
console.log(`DPoS Winner: ${dposWinner} (Votes: ${votes[dposWinner]})`);
