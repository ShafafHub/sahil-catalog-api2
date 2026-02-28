const crypto = require("node:crypto");
const { checkPassword } = require("./password");
const { findUserByEmail, findUserById } = require("./store");

const sessions = new Map();

function makeToken() {
  return crypto.randomBytes(24).toString("hex");
}

function loginUser(email, pwd) {
  const user = findUserByEmail(email);
  if (!user || !checkPassword(pwd, user.password_hash)) return null;
  const token = makeToken();
  sessions.set(token, user.id);
  return { token };
}

function getUser(token) {
  const uid = sessions.get(token);
  return uid ? findUserById(uid) : null;
}

function authMiddleware(req, res, next) {
  const [type, token] = (req.headers.authorization || "").split(" ");
  if (type !== "Bearer" || !token)
    return res.status(401).json({ error: "Unauthorized" });

  const user = getUser(token);
  if (!user) return res.status(401).json({ error: "Invalid token" });
  req.user = user;
  next();
}

module.exports = { loginUser, authMiddleware };
