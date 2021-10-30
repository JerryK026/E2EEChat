function base64encode(plaintext) {
  return Buffer.from(plaintext, "utf8").toString("base64");
}

function base64decode(base64text) {
  return Buffer.from(base64text, "base64").toString("utf8");
}

module.exports = { base64encode, base64decode };
