const fs = require("node:fs");
const path = require("node:path");
const Database = require("better-sqlite3");
const { encryptPassword } = require("./password");

const DB_FILE = path.join(__dirname, "..", "..", "data", "app.db");
const SCHEMA_FILE = path.join(__dirname, "..", "..", "data", "schema.sql");

const db = new Database(DB_FILE);

function initDatabase() {
  const schema = fs.readFileSync(SCHEMA_FILE, "utf8");
  db.exec(schema);

  // default admin
  const hash = encryptPassword("sahil1234");
  db.prepare("INSERT INTO users(email,password_hash,role) VALUES(?,?,?)").run(
    "sahil@gmail.com",
    hash,
    "sahil",
  );

  // categories
  const insertCat = db.prepare("INSERT INTO categories(name) VALUES(?)");
  ["office", "electronics", "lifestyle"].forEach((c) => insertCat.run(c));

  const categories = db.prepare("SELECT id,name FROM categories").all();
  const catMap = {};
  categories.forEach((c) => (catMap[c.name] = c.id));

  // products
  const insertProd = db.prepare(
    "INSERT INTO products(name,price,category_id) VALUES(?,?,?)",
  );
  insertProd.run("Mouse pad", 80, catMap.office);
  insertProd.run("VGA cable", 100, catMap.electronics);
  insertProd.run("Tv controller", 150, catMap.office);
  insertProd.run("Bag", 220, catMap.lifestyle);
  insertProd.run("Sticky note", 50, catMap.office);
}

module.exports = { db, initDatabase };
