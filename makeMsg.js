const crypto = require("crypto");

// bit 단위
// const NONCE_LENGTH = 30;
// byte 단위
//const nonce = crypto.random(NONCE_LENGTH);

const nonce = "A / Xqf";
// const body =
//   "WhnmchdhP6aS28bbp6WXElQacdJK59cGwlTDY0FKmKUf8uA/XqfIIpdnED+yFj0+w==";

module.exports = (from, to, body) => {
  const msg = `3EPROTO MSGSEND\nFrom: ${from}\nTo: ${to}\nNonce: ${nonce}\n\n${body}`;
  return msg;
};
