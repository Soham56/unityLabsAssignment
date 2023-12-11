# UNITYLABS.AI ASSIGNMENT

## Description

This project serves as the backend for a REST API with authentication and authorization mechanisms. It includes routes for user registration, login, buyer-specific operations, and seller-specific operations. The project utilizes MongoDB (Nosql Database) for data storage and JWT (Json Web Token) for authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Buyer Routes](#buyer-routes)
- [Seller Routes](#seller-routes)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Soham56/unityLabsAssignment.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and set the following environment variables:

   ```
   MONGO_URI=<your-mongo-uri>
   JWT_SECRET=<your-jwt-secret>
   JWT_EXPIRESIN=<your-jwt-expires-in>
   ```

4. Run the server:

   ```bash
   npm start
   ```

The server will be running on PORT 3000.

## Usage

Make HTTP requests to the API endpoints as described below.

## Authentication

- **Login:** `POST /api/auth/login`
  - Requires a valid bearer token for authentication.
  - If not authenticated, the user needs to register.

- **Register:** `POST /api/auth/register`
  - Requires the following fields in the request body:
    - `username` (string)
    - `password` (string)
    - `type` (string, must be 'buyer' or 'seller')
    - Example : 
        ```
        {
            "username": "Your Username",
            "password": "Your Password",
            "type": "buyer"
        }
        ```

## Buyer Routes

- **List of Sellers:** `GET /api/buyer/list-of-sellers`
  - Requires a valid bearer token with buyer role.

- **Seller Catalog:** `GET /api/buyer/seller-catalog/:seller_id`
  - Requires a valid bearer token with buyer role.
  - Requires a valid `seller_id` parameter.

- **Create Order:** `POST /api/buyer/create-order/:seller_id`
  - Requires a valid bearer token with buyer role.
  - Requires a valid `seller_id` parameter.
  - Requires an array of objects in the request body, each having `productId`, `name`, and `price`.
  - Example : 
    ```
        [
            {
                "productId": "seller's catalog productId1",
                "name": "product3",
                "price": 344
            },
            .
            .,
            {
                "productId": "seller's catalog productId2",
                "name": "product1",
                "price": 2332
            }
        ]
    ```

## Seller Routes

- **Create Catalog:** `POST /api/seller/create-catalog`
  - Requires a valid bearer token with seller role.
  - Requires an array of objects in the request body, each having `name` and `price`.
  - Example : 
    ```
        [
            {
                "name": "product1",
                "price": "2332"
            },
            {
                "name": "product2",
                "price": "255"
            },
            .
            .,
            {
                "name":"product3",
                "price":"34io"
            }
        ]
    ```

- **Orders:** `GET /api/orders`
  - Requires a valid bearer token with seller role.

## Error Handling

- If a route does not exist, the server will respond with 'Route does not exist.'

## Environment Variables

- `MONGO_URI`: MongoDB connection URI.
- `JWT_SECRET`: Secret key for JWT token generation.
- `JWT_EXPIRESIN`: Token expiration time.
