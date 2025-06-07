// mining_simulation.js

const crypto = require("crypto");

class Block {
  constructor(data) {
    this.data = data;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(this.data + this.nonce)
      .digest("hex");
  }

  mine(difficulty) {
    const target = "0".repeat(difficulty);
    while (!this.hash.startsWith(target)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(` Block mined! Nonce: ${this.nonce}`);
    console.log(`Hash: ${this.hash}`);
  }
}

const block = new Block("Reward to Alice");
console.log(" Starting mining...");
block.mine(4); 
