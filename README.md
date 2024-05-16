# E-commerce Backend API

This API is designed to manage the backend and database for an e-commerce platform using Node.js, Express, Sequelize, and PostgreSQL, deployed on Railway.

CRUD operations are implemented to manage entities such as products, users, customers, categories, and orders, including the creation of schemas, models, and relationships in the database.

## Database Relations

- **One-to-One Relationship:&nbsp;**
  - A customer is associated with one user.

- **One-to-Many Relationship:&nbsp;**
  - A customer can have many orders.
  - A category can have many products.

- **Many-to-Many Relationship:&nbsp;**
  - Orders can have multiple products, and products can belong to multiple orders.

## Important information

- **For products:&nbsp;**
  Creating or updating a product requires the existence of a category.

- **For customers:&nbsp;**
  Creating a customer requires the existence of a user.

- **For orders:&nbsp;**
  Creating an order requires the existence of a customer.

- **For orderproducts (join table):&nbsp;**
  Creating an OrderProduct requires the existence of both an order and a product.

## Getting Started

To get started with the E-commerce Backend API, follow the instructions below:

## Base URL

To all your requests use the following URL as your base URL:

```
https://ecommerce-api-node.up.railway.app/api/v1
```

## Table of Contents

- [Products](#products)
- [Orders](#orders)
- [Customers](#customers)
- [Categories](#categories)
- [Users](#users)

## API Endpoints

### Products

- **GET /products:** Get all products.
- **POST /products:** Create a new product.
- **GET /products/{id}:** Get a product by ID.
- **PATCH /products/{id}:** Update a product by ID.
- **DELETE /products/{id}:** Delete a product by ID.

#### Get All Products

```
GET /api/v1/products
```

| Query Parameter | Type    | Required | Description                          |
|-----------------|---------|----------|--------------------------------------|
| limit           | Integer | No       | Limit the number of products         |
| offset          | Integer | No       | Offset for pagination                |
| price           | Integer | No       | Filter by product price              |
| price_min       | Integer | No       | Minimum price filter                 |
| price_max       | Integer | No       | Maximum price filter (must be greater than `price_min`) |

**Response:**
```
[
  {
    "id": 1,
    "name": "Product A",
    "price": 10.99,
    "image": "https://example.com/productA.jpg",
    "blocked": false
  },
  ...
]
```

#### Create a New Product

```
POST /api/v1/products
```

| Field        | Type    | Required | Description                           |
|--------------|---------|----------|---------------------------------------|
| name         | String  | Yes      | Name of the product                   |
| price        | Integer | Yes      | Price of the product                  |
| image        | String  | Yes      | URL of the product image              |
| blocked      | Boolean | Yes      | Whether the product is blocked        |
| description  | String  | Yes      | Description of the product            |
| categorieId  | Integer | No       | ID of the category the product belongs to |

**Response:**
```
{
  "id": 101,
  "name": "New Product",
  "price": 15.99,
  "image": "https://example.com/newproduct.jpg",
  "blocked": false
}
```

#### Get a Product by ID

```
GET /api/v1/products/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the product      |

**Response:**
```
{
  "id": 101,
  "name": "New Product",
  "price": 15.99,
  "image": "https://example.com/newproduct.jpg",
  "blocked": false
}
```

#### Update a Product by ID

```
PATCH /api/v1/products/{id}
```

| Parameter   | Type    | Required | Description            |
|-------------|---------|----------|------------------------|
| id          | Integer | Yes      | ID of the product      |

| Field       | Type    | Required | Description            |
|-------------|---------|----------|------------------------|
| name        | String  | No       | Name of the product    |
| price       | Integer | No       | Price of the product   |
| image       | String  | No       | URL of the product image |
| blocked     | Boolean | No       | Whether the product is blocked |
| description | String  | No       | Description of the product |

**Response:**
```
{
  "id": 101,
  "name": "New Product",
  "price": 17.99,
  "image": "https://example.com/newproduct.jpg",
  "blocked": false
}
```

#### Delete a Product by ID

```
DELETE /api/v1/products/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the product      |

**Response:**
```
{
  "message": "Product with ID 101 deleted successfully"
}
```

### Orders

- **GET /orders:** Get all orders.
- **POST /orders:** Create a new order.
- **GET /orders/customer/{id}:** Get an order by customer ID.
- **POST /orders/{orderId}/product/{productId}:** Add a product to an order.
- **GET /orders/{id}:** Get an order by ID.
- **PATCH /orders/{id}:** Update an order by ID.
- **DELETE /orders/{id}:** Delete an order by ID.

#### Get All Orders

```
GET /api/v1/orders
```

**Response:**
```
[
  {
    "id": 1,
    "customerId": 1,
    "status": "paid"
  },
  ...
]
```

#### Create a New Order

```
POST /api/v1/orders
```

| Field        | Type    | Required | Description                           |
|--------------|---------|----------|---------------------------------------|
| customerId   | Integer | Yes      | ID of the customer                    |
| status       | String  | Yes      | Status of the order ('paid', 'delivered', 'shipped') |

**Response:**
```
{
  "id": 101,
  "customerId": 1,
  "status": "paid"
}
```

#### Get an Order by Customer ID

```
GET /api/v1/orders/customer/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the customer     |

**Response:**
```
{
  "id": 101,
  "customerId": 1,
  "status": "paid"
}
```

#### Add a Product to an Order

```
POST /api/v1/orders/{orderId}/product/{productId}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| orderId   | Integer | Yes      | ID of the order        |
| productId | Integer | Yes      | ID of the product      |

| Field     | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| amount    | Integer | Yes      | Amount of the product  |

**Response:**
```
{
  "message": "item added correctly to the order",
  "data": {
    "orderId": 101,
    "productId": 202,
    "amount": 3
  }
}
```

#### Get an Order by ID

```
GET /api/v1/orders/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the order        |

**Response:**
```
{
  "id": 101,
  "customerId": 1,
  "status": "paid"
}
```

#### Update an Order by ID

```
PATCH /api/v1/orders/{id}
```

| Parameter   | Type    | Required | Description            |
|-------------|---------|----------|------------------------|
| id          | Integer | Yes      | ID of the order        |

| Field       | Type    | Required | Description            |
|-------------|---------|----------|------------------------|
| customerId  | Integer | No       | ID of the customer     |
| status      | String  | No       | Status of the order    |

**Response:**
```
{
  "id": 101,
  "customerId": 1,
  "status": "delivered"
}
```

#### Delete an Order by ID

```
DELETE /api/v1/orders/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the order        |

**Response:**
```
{
  "message": "Order with ID 101 deleted successfully"
}
```

### Customers

- **GET /customers:** Get all customers.
- **POST /customers:** Create a new customer.
- **GET /customers/{id}:** Get a customer by ID.
- **PATCH /customers/{id}:** Update a customer by ID.
- **DELETE /customers/{id}:** Delete a customer by ID.

#### Get All Customers

```
GET /api/v1/customers
```

**Response:**
```
[
  {
    "id": 1,
    "name": "John",
    "lastName": "Doe",
    "phone": "1234567890"
  },
  ...
]
```

#### Create a New Customer

```
POST /api/v1/customers
```

| Field     | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| name      | String  | Yes      | Name of the customer   |
| lastName  | String  | Yes      | Last name of the customer |
| phone     | Integer | Yes      | Phone number of the customer |

**Response:**
```
{
  "id": 101,
  "name": "Jane",
  "lastName": "Doe",
  "phone": "9876543210"
}
```

#### Get a Customer by ID

```
GET /api/v1/customers/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the customer     |

**Response:**
```
{
  "id": 101,
  "name": "Jane",
  "lastName": "Doe",
  "phone": "9876543210"
}
```

#### Update a Customer by ID

```
PATCH /api/v1/customers/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the customer     |

| Field     | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| name      | String  | No       | Name of the customer   |
| lastName  | String  | No       | Last name of the customer |
| phone     | Integer | No       | Phone number of the customer |

**Response:**
```
{
  "message": "content updated successfully",
  "id": 101,
  "data": {
    "name": "Jane",
    "lastName": "Doe",
    "phone": "9876543210"
  }
}
```

#### Delete a Customer by ID

```
DELETE /api/v1/customers/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the customer     |

**Response:**
```
{
  "message": "content deleted successfully",
  "id": 101
}
```

### Categories

- **GET /categories:** Get all categories.
- **POST /categories:** Create a new category.
- **GET /categories/{id}:** Get a category by ID.
- **PATCH /categories/{id}:** Update a category by ID.
- **DELETE /categories/{id}:** Delete a category by ID.
- **GET /categories/{categoryId}/products/{productId}:** Get a category and product IDs.

#### Get All Categories

```
GET /api/v1/categories
```

**Response:**
```
[
  {
    "id": 1,
    "name": "Category A",
    "image": "https://example.com/categoryA.jpg"
  },
  ...
]
```

#### Create a New Category

```
POST /api/v1/categories
```

| Field     | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| name      | String  | Yes      | Name of the category   |
| image     | String  | Yes      | URL of the category image |

**Response:**
```
{
  "id": 101,
  "name": "Category B",
  "image": "https://example.com/categoryB.jpg"
}
```

#### Get a Category by ID

```
GET /api/v1/categories/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the category     |

**Response:**
```
{
  "id": 101,
  "name": "Category B",
  "image": "https://example.com/categoryB.jpg"
}
```

#### Update a Category by ID

```
PATCH /api/v1/categories/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the category     |

| Field     | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| name      | String  | No       | Name of the category   |
| image     | String  | No       | URL of the category image |

**Response:**
```
{
  "message": "category updated successfully",
  "id": 101,
  "data": {
    "name": "Category B",
    "image": "https://example.com/categoryB.jpg"
  }
}
```

#### Delete a Category by ID

```
DELETE /api/v1/categories/{id}
```

| Parameter | Type    | Required | Description            |
|-----------|---------|----------|------------------------|
| id        | Integer | Yes      | ID of the category     |

**Response:**
```
{
  "message": "category deleted successfully"
}
```

#### Get a Category and Product IDs

```
GET /api/v1/categories/{categoryId}/products/{productId}
```

| Parameter   | Type    | Required | Description            |
|-------------|---------|----------|------------------------|
| categoryId  | Integer | Yes      | ID of the category     |
| productId   | Integer | Yes      | ID of the product      |

**Response:**
```
{
  "categoryId": 101,
  "productId": 202
}
```

### Users

- **GET /users:** Get all users.
- **GET /users/tasks:** Get all tasks of users.
- **POST /users:** Create a new user.
- **GET /users/{id}:** Get a user by ID.
- **PATCH /users/{id}:** Update a user by ID.
- **DELETE /users/{id}:** Delete a user by ID.

#### Get All Users

```
GET /api/v1/users
```

**Response:**
```
[
  {
    "id": 1,
    "email": "user1@example.com",
    "name": "User 1",
    "role": "user"
  },
  ...
]
```

#### Get All Tasks of Users

```
GET /api/v1/users/tasks
```

**Response:**
```
[
  {
    "userId": 1,
    "task": "Task 1"
  },
  ...
]
```

#### Create a New User

```
POST /api/v1/users
```

| Field    | Type    | Required | Description          |
|----------|---------|----------|----------------------|
| email    | String  | Yes      | Email of the user    |
| password | String  | Yes      | Password of the user |
| role     | String  | No       | Role of the user     |
| name     | String  | No       | Name of the user     |

**Response:**
```
{
  "id": 101,
  "email": "newuser@example.com",
  "name": "New User",
  "role": "user"
}
```

#### Get a User by ID

```
GET /api/v1/users/{id}
```

| Parameter | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| id        | Integer | Yes      | ID of the user   |

**Response:**
```
{
  "id": 101,
  "email": "newuser@example.com",
  "name": "New User",
  "role": "user"
}
```

#### Update a User by ID

```
PATCH /api/v1/users/{id}
```

| Parameter | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| id        | Integer | Yes      | ID of the user   |

| Field     | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| email     | String  | No       | Email of the user|
| password  | String  | No       | Password of the user|

**Response:**
```
{
  "message": "content updated successfully",
  "id": 101,
  "data": {
    "email": "newuser@example.com",
    "name": "New User",
    "role": "user"
  }
}
```

#### Delete a User by ID

```
DELETE /api/v1/users/{id}
```

| Parameter | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| id        | Integer | Yes      | ID of the user   |

**Response:**
```
{
  "message": "content deleted successfully"
}
```

## Author

[![Contribuidores](https://contrib.rocks/image?repo=J-HernandezM/curso-backend-node)](https://github.com/J-HernandezM/curso-backend-node/graphs/contributors)
