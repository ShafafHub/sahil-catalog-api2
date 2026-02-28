const express = require("express");
const { initDatabase } = require("./lib/db");
const {
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
  getUserByEmail,
  getUserById,
} = require("./lib/store");

const {
  checkProductData,
  checkCategoryData,
  checkLoginData,
} = require("./lib/validate");
const { loginUser, authMiddleware } = require("./lib/auth");

function makeApp() {
  initDatabase();
  const app = express();
  app.use(express.json());

  // --- Health ---
  app.get("/health", (_, res) => res.json({ status: "ok" }));

  // --- Auth ---
  app.post("/auth/login", (req, res) => {
    const errors = checkLoginData(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const result = loginUser(req.body.email, req.body.password);
    if (!result) return res.status(401).json({ error: "Invalid credentials" });
    res.json(result);
  });

  app.get("/auth/me", authMiddleware, (req, res) =>
    res.json({ user: req.user }),
  );

  // --- Products ---
  app
    .route("/products")
    .get((req, res) => res.json(fetchProducts(req.query)))
    .post(authMiddleware, (req, res) => {
      const errors = checkProductData(req.body);
      if (errors.length) return res.status(400).json({ errors });
      res.status(201).json(addProduct(req.body));
    });

  app
    .route("/products/:id")
    .get((req, res) => {
      const product = getProduct(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    })
    .put(authMiddleware, (req, res) => {
      const errors = checkProductData(req.body);
      if (errors.length) return res.status(400).json({ errors });
      const updated = editProduct(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Product not found" });
      res.json(updated);
    })
    .delete(authMiddleware, (req, res) => {
      if (!removeProduct(req.params.id))
        return res.status(404).json({ error: "Product not found" });
      res.status(204).send();
    });

  // --- Categories ---
  app
    .route("/categories")
    .get((req, res) => res.json(fetchCategories(req.query)))
    .post(authMiddleware, (req, res) => {
      const errors = checkCategoryData(req.body);
      if (errors.length) return res.status(400).json({ errors });
      res.status(201).json(addCategory(req.body));
    });

  app
    .route("/categories/:id")
    .get((req, res) => {
      const category = getCategory(req.params.id);
      if (!category)
        return res.status(404).json({ error: "Category not found" });
      res.json(category);
    })
    .put(authMiddleware, (req, res) => {
      const errors = checkCategoryData(req.body);
      if (errors.length) return res.status(400).json({ errors });
      const updated = editCategory(req.params.id, req.body);
      if (!updated)
        return res.status(404).json({ error: "Category not found" });
      res.json(updated);
    })
    .delete(authMiddleware, (req, res) => {
      if (!removeCategory(req.params.id))
        return res.status(404).json({ error: "Category not found" });
      res.status(204).send();
    });

  // --- 404 ---
  app.use((_, res) => res.status(404).json({ error: "Route not found" }));

  return app;
}

// --- Start server ---
function boot(port = 3000) {
  const app = makeApp();
  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`),
  );
  return app;
}

if (require.main === module) boot(process.env.PORT || 3000);

module.exports = { makeApp, boot };
