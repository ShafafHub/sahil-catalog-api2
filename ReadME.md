# Catalog API

This project is a simple API for managing products and categories with authentication (Login) and CRUD operations.

## Prerequisites

- Node.js (v18 or higher recommended)
- SQLite3
- A code editor like VS Code
- API testing tool like Postman or Thunder Client

## Project Setup

1. Clone or copy the project:

```bash
git clone <repository-url>
cd catalog-api2

Install dependencies:

npm install

Database setup:

The schema file data/schema.sql is included.

When you run the project, the SQLite database data/app.db will be automatically created.

Running the Server
node src/index.js

 you should see:


=================

### 1. Health Check
GET http://localhost:3000/health
Accept: application/json


### 2. Login (Get Token)
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "sahil@gmail.com",
  "password": "sahil12345"
}


### 3. Get Current User (replace <TOKEN> with token from login response)
GET http://localhost:3000/auth/me
Authorization: Bearer <TOKEN>
Accept: application/json


### 4. List Products
GET http://localhost:3000/products
Authorization: Bearer <TOKEN>
Accept: application/json


### 5. Add New Product
POST http://localhost:3000/products
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "name": "TV",
  "price": 500,
  "categoryId": 2
}


### 6. Get Product by ID
GET http://localhost:3000/products/1
Authorization: Bearer <TOKEN>
Accept: application/json


### 7. Update Product
PUT http://localhost:3000/products/1
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "name": "pencil",
  "price": 10,
  "categoryId": 1
}


### 8. Delete Product
DELETE http://localhost:3000/products/1
Authorization: Bearer <TOKEN>


### 9. List Categories
GET http://localhost:3000/categories
Authorization: Bearer <TOKEN>
Accept: application/json


### 10. Add New Category
POST http://localhost:3000/categories
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "name": "stationary"
}


### 11. Get Category by ID
GET http://localhost:3000/categories/1
Authorization: Bearer <TOKEN>
Accept: application/json


### 12. Update Category
PUT http://localhost:3000/categories/1
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "name": "New Itemsgit checkout week4"
}


### 13. Delete Category
DELETE http://localhost:3000/categories/1
Authorization: Bearer <TOKEN>
```

Link video : https://drive.google.com/file/d/1AfOuzzcpdFqyj9j5oWEuaBXZrEkdu7gr/view?usp=drive_link
