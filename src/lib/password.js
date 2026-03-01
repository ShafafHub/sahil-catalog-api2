const crypto = require("node:crypto");

function encryptPassword(pwd) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(pwd, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function checkPassword(pwd, stored) {
  const [salt, hash] = stored.split(":");
  const verify = crypto.scryptSync(pwd, salt, 64).toString("hex");
  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(verify, "hex"),
  );
}

module.exports = { encryptPassword, checkPassword };
