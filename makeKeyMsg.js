const crypto = require("crypto");
const { base64decode } = require("./encoder");
require("dotenv").config();

const keyAlgorithm = "AES-256-CBC";
// const IV_LENGTH = 16;
const key = process.env.ENCRYPTION_KEY;
// const iv = crypto.randomBytes(IV_LENGTH);
const iv = "f8uA/XqfIIpdnED+yFj0+w==";

module.exports = (from, to) => {
  const msg = `3EPROTO KEYXCHG\nAlgo: ${keyAlgorithm}\nFrom: ${from}\nTo: ${to}\n\n${key}\n${iv}`;
  return msg;
};
