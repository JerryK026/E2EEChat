const crypto = require("crypto");

// const cipher = () => {
//   crypto.createCipher("aes-256-cbc", "key");
//   let result = cipher.update("pass", "utf8", "base64");
//   result += cipher.final("base64");
//   console.log(`Encryption ${pass} => \t ${result}`);
//   return result;
// };

// const decipher = () => {
//   crypto.createDecipher("aes-256-cbc", "key");
//   let result2 = decipher.update(result, "base64", "utf8");
//   result2 += decipher.final("utf8");
//   console.log(`Decryption ${result} => \t ${pass}`);
//   return result2;
// };

module.exports = {
  cipherText: (skey, pkey) => {
    crypto.createCipher("aes-256-cbc", skey);
    let result = cipher.update(pkey, "utf8", "base64");
    result += cipher.final("base64");
    console.log(`Encryption ${pass} => \t ${result}`);
    return result;
  },
  cipherKey: (skey, pkey) => {
    const pem =
      "----- BEGIN CERTIFICATE -----\n" + +"\n-----END CERTIFICATE-----";
    crypto.publicEncrypt(pem);
  },
  decipherKey: (skey, pkey) => {
    crypto.createDecipher("aes-256-cbc", skey);
    let result = decipher.update(pkey, "base64", "utf8");
    result += decipher.final("utf8");
    console.log(`Decryption ${result} => \t ${pass}`);
    return result;
  },
};
