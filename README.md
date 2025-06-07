const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) +
          this.previousHash +
          this.nonce
      )
      .digest("hex");
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now().toString(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash(); // recalculate hash with updated previousHash
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }

  printChain() {
    this.chain.forEach((block, i) => {
      console.log('\nBlock ${i}');
      console.log('Index: ${block.index}');
      console.log('Timestamp: ${block.timestamp}');
      console.log('Data: ${JSON.stringify(block.data)}');
      console.log('Previous Hash: ${block.previousHash}');
      console.log('Hash: ${block.hash}');
    });
  }
}

// ---- Run the simulation ----

let myBlockchain = new Blockchain();

myBlockchain.addBlock(new Block(1, Date.now().toString(), { amount: 50 }));
myBlockchain.addBlock(new Block(2, Date.now().toString(), { amount: 100 }));

console.log(" Original Blockchain:");
myBlockchain.printChain();
console.log("\nIs blockchain valid?", myBlockchain.isChainValid());

// ---- 🔧 Tamper with Block 1 ----
console.log("\n Tampering with Block 1...");
myBlockchain.chain[1].data = { amount: 999 };
myBlockchain.chain[1].hash = myBlockchain.chain[1].calculateHash();

console.log("\n After Tampering:");
myBlockchain.printChain();
console.log("\nIs blockchain valid?", myBlockchain.isChainValid());
