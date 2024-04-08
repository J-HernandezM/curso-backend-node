# Product API
This API provides CRUD (Create, Read, Update, Delete) operations for managing products. It allows you to perform various operations such as fetching all products, creating a new product, updating an existing product, and deleting a product by ID to practice async/await at your frontend

## Getting Started
To get started with the Product API, follow the instructions below:

## Base url
To all your requests use the following url as your base url
```
https://curso-backend-node-production.up.railway.app/api/v1
```
## API Endpoints
The following endpoints are available:

- GET /products: Get all products.
- POST /products: Create a new product.
- GET /products/{id}: Get a product by ID.
- PATCH /products/{id}: Update a product by ID.
- DELETE /products/{id}: Delete a product by ID.

## Example Usage
Get all products
```
GET /api/v1/products
```
Response:
```
[
  {
    "id": 1,
    "name": "Product A",
    "price": 10.99,
    "image": "https://example.com/productA.jpg",
    "blocked": false
  },
  {
    "id": 2,
    "name": "Product B",
    "price": 20.49,
    "image": "https://example.com/productB.jpg",
    "blocked": false
  },
  ...
]
```
Create a new product
```
POST /api/v1/products
```
Request Body:

```
{
  "name": "New Product",
  "price": 15.99,
  "image": "https://example.com/newproduct.jpg",
  "blocked": false
}
```
Response:

```
{
  "id": 101,
  "name": "New Product",
  "price": 15.99,
  "image": "https://example.com/newproduct.jpg",
  "blocked": false
}
```
Get a product by ID
```
GET /api/v1/products/101
```
Response:

```
{
  "id": 101,
  "name": "New Product",
  "price": 15.99,
  "image": "https://example.com/newproduct.jpg",
  "blocked": false
}
```
Update a product by ID
```
PATCH /api/v1/products/101
```
Request Body:

```
{
  "price": 17.99
}
```
Response:

```
{
  "id": 101,
  "name": "New Product",
  "price": 17.99,
  "image": "https://example.com/newproduct.jpg",
  "blocked": false
}
Delete a product by ID
bash
Copy code
DELETE /api/v1/products/101
```
Response:
```
{
  "message": "Product with ID 101 deleted successfully"
}
```

# Author

[![Contribuidores](https://contrib.rocks/image?repo=J-HernandezM/curso-backend-node)](https://github.com/J-HernandezM/curso-backend-node/graphs/contributors)
