const crypto = require("crypto");

module.exports = {
  cipherText: (skey, msg, iv) => {
    const skeyBuffer = Buffer.from(skey, "utf-8");
    const cipher = crypto.createCipheriv("aes-256-cbc", skeyBuffer, iv);
    let result = cipher.update(msg, "utf8", "base64");
    result += cipher.final("base64");
    return result;
  },
  cipherSymmetricKey: (skey, pkey) => {
    const enc = crypto.publicEncrypt(pkey, Buffer.from(skey));
    const encryptedSKey = enc.toString("base64");
    return encryptedSKey;
  },
  decipherSymmetricKey: (eskey, prkey) => {
    const privateKey = crypto.createPrivateKey({
      key: prkey,
      format: "pem",
      passphrase: "",
    });

    const symmetricKey = crypto.privateDecrypt(
      privateKey,
      Buffer.from(eskey, "base64")
    );
    console.log("decrypted symmectirc key : " + symmetricKey.toString("utf-8"));
    return symmetricKey.toString("utf8");
  },
  decipherText: (skey, iv, emsg) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", skey, iv);
    let msg = decipher.update(emsg, "base64", "utf8");
    msg += decipher.final("utf8");
    console.log("decrypted msg : " + msg);
    return msg;
  },
};
