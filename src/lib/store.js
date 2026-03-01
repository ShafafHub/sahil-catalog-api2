const { db } = require("./db");

// --- Users ---
function getUserByEmail(email) {
  return db
    .prepare("SELECT id,email,password_hash,role FROM users WHERE email=?")
    .get(email);
}
// new
function findUserByEmail(email) {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email);
}

function findUserById(id) {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id);
}

//new
function getUserById(id) {
  return db
    .prepare("SELECT id,email,password_hash,role FROM users WHERE id=?")
    .get(id);
}
// --- Products ---
function fetchProducts({ search, limit, offset } = {}) {
  let sql = "SELECT id,name,price,category_id FROM products";
  const params = [];

  if (search) {
    sql += " WHERE name LIKE ?";
    params.push(`%${search}%`);
  }
  if (limit) {
    sql += " LIMIT ?";
    params.push(Number(limit));
  }
  if (offset) {
    sql += " OFFSET ?";
    params.push(Number(offset));
  }

  return db.prepare(sql).all(...params);
}

function getProduct(id) {
  return db
    .prepare("SELECT id,name,price,category_id FROM products WHERE id=?")
    .get(id);
}

function addProduct({ name, price, categoryId }) {
  const res = db
    .prepare("INSERT INTO products(name,price,category_id) VALUES(?,?,?)")
    .run(name, price, categoryId);
  return getProduct(res.lastInsertRowid);
}

function editProduct(id, { name, price, categoryId }) {
  const res = db
    .prepare("UPDATE products SET name=?,price=?,category_id=? WHERE id=?")
    .run(name, price, categoryId, id);
  return res.changes ? getProduct(id) : null;
}

function removeProduct(id) {
  const res = db.prepare("DELETE FROM products WHERE id=?").run(id);
  return res.changes > 0;
}

// --- Categories ---
function fetchCategories({ search, limit, offset } = {}) {
  let sql = "SELECT id,name FROM categories";
  const params = [];

  if (search) {
    sql += " WHERE name LIKE ?";
    params.push(`%${search}%`);
  }
  if (limit) {
    sql += " LIMIT ?";
    params.push(Number(limit));
  }
  if (offset) {
    sql += " OFFSET ?";
    params.push(Number(offset));
  }

  return db.prepare(sql).all(...params);
}

function getCategory(id) {
  return db.prepare("SELECT id,name FROM categories WHERE id=?").get(id);
}

function addCategory({ name }) {
  const res = db.prepare("INSERT INTO categories(name) VALUES(?)").run(name);
  return getCategory(res.lastInsertRowid);
}

function editCategory(id, { name }) {
  const res = db
    .prepare("UPDATE categories SET name=? WHERE id=?")
    .run(name, id);
  return res.changes ? getCategory(id) : null;
}

function removeCategory(id) {
  const res = db.prepare("DELETE FROM categories WHERE id=?").run(id);
  return res.changes > 0;
}

module.exports = {
  fetchProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,

  fetchCategories,
  getCategory,
  addCategory,
  editCategory,
  removeCategory,
  findUserByEmail,
  getUserByEmail,
  getUserById,
  findUserById,
};
