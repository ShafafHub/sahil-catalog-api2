// --- Product validation ---
function checkProductData(data) {
  if (!data || typeof data !== "object")
    return ["Request body must be an object"];
  const errors = [];

  if (!data.name || typeof data.name !== "string" || !data.name.trim())
    errors.push("name is required and must be a non-empty string");
  if (typeof data.price !== "number" || data.price < 0)
    errors.push("price must be a number >= 0");
  if (typeof data.categoryId !== "number")
    errors.push("categoryId is required and must be a number");

  return errors;
}

// --- Category validation ---
function checkCategoryData(data) {
  if (!data || typeof data !== "object")
    return ["Request body must be an object"];
  return !data.name || typeof data.name !== "string" || !data.name.trim()
    ? ["name is required and must be a non-empty string"]
    : [];
}

// --- Login validation ---
function checkLoginData(data) {
  if (!data || typeof data !== "object")
    return ["Request body must be an object"];
  const errors = [];
  if (!data.email || !data.email.trim()) errors.push("email is required");
  if (!data.password || !data.password.trim())
    errors.push("password is required");
  return errors;
}

module.exports = { checkProductData, checkCategoryData, checkLoginData };
