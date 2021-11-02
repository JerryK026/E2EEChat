const crypto = require("crypto");

const prime_length = 256;
const diffHell = crypto.createDiffieHellman(prime_length);

diffHell.generateKeys("base64");
// console.log("Public Key : ", diffHell.getPublicKey("base64"));
// console.log("Private Key : ", diffHell.getPrivateKey("base64"));

// console.log("Public Key : ", diffHell.getPublicKey("hex"));
// console.log("Private Key : ", diffHell.getPrivateKey("hex"));

module.exports = diffHell;
