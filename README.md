# E-Commerce API

## Overview

This project is an E-Commerce API built using Express.js and MongoDB. It provides endpoints for managing users, products, orders, carts, and wishlists. The API is documented using Swagger for easy reference and interaction.

## API Documentation

You can view the interactive API documentation provided by Swagger UI at:

# Swagger UI Documentation


## Endpoints

### Users

- **Register a New User**
  - `POST /users/register`
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "phoneNumber": "string"
    }
    ```
  - **Responses:**
    - `201 Created` - User successfully registered.
    - `400 Bad Request` - Missing required fields.

- **Login**
  - `POST /users/login`
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Responses:**
    - `200 OK` - Successful login, returns access token.
    - `401 Unauthorized` - Invalid email or password.

- **Update User Data**
  - `PATCH /users/current/:id`
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string"
    }
    ```
  - **Responses:**
    - `200 OK` - User data updated successfully.
    - `400 Bad Request` - No data provided to update.

- **Forgot Password**
  - `POST /users/forgot-password`
  - **Request Body:**
    ```json
    {
      "email": "string"
    }
    ```
  - **Responses:**
    - `200 OK` - Password reset email sent.
    - `404 Not Found` - Email not found.

- **Reset Password**
  - `POST /users/reset-password/:token`
  - **Request Body:**
    ```json
    {
      "password": "string"
    }
    ```
  - **Responses:**
    - `200 OK` - Password reset successfully.
    - `400 Bad Request` - Invalid or expired reset token.

### Products

- **Get All Products**
  - `GET /products`
  - **Responses:**
    - `200 OK` - Returns a list of products.

- **Get Product by ID**
  - `GET /products/:id`
  - **Responses:**
    - `200 OK` - Returns product details.
    - `404 Not Found` - Product not found.

- **Create a Product**
  - `POST /products`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "price": "number",
      "brand": "string",
      "description": "string",
      "category": "string"
    }
    ```
  - **Responses:**
    - `201 Created` - Product created successfully.
    - `400 Bad Request` - Missing required fields.

- **Update a Product**
  - `PATCH /products/:id`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "price": "number",
      "brand": "string",
      "description": "string",
      "category": "string"
    }
    ```
  - **Responses:**
    - `200 OK` - Product updated successfully.
    - `404 Not Found` - Product not found.

- **Delete a Product**
  - `DELETE /products/:id`
  - **Responses:**
    - `200 OK` - Product deleted successfully.
    - `404 Not Found` - Product not found.

- **Search Products**
  - `GET /products/search`
  - **Request Query Parameters:**
    - `q` - Search query.
  - **Responses:**
    - `200 OK` - Returns search results.

- **Get Products by Category**
  - `GET /products/category`
  - **Request Query Parameters:**
    - `category` - Product category.
  - **Responses:**
    - `200 OK` - Returns products in the specified category.
    - `404 Not Found` - No products found in this category.

### Orders

- **Create an Order**
  - `POST /orders/create`
  - **Request Body:**
    ```json
    {
      "items": [
        {
          "product": "ObjectId",
          "quantity": "number",
          "price": "number"
        }
      ],
      "totalAmount": "number"
    }
    ```
  - **Responses:**
    - `201 Created` - Order created successfully.

- **Add Items to Order**
  - `POST /orders`
  - **Request Body:**
    ```json
    {
      "items": [
        {
          "product": "ObjectId",
          "quantity": "number",
          "price": "number"
        }
      ]
    }
    ```
  - **Responses:**
    - `200 OK` - Items added to order successfully.

- **Get Order by ID**
  - `GET /orders/:id`
  - **Responses:**
    - `200 OK` - Returns order details.
    - `404 Not Found` - Order not found.

- **Update Order Status to Paid**
  - `PATCH /orders/:id/pay`
  - **Responses:**
    - `200 OK` - Order status updated to paid.
    - `404 Not Found` - Order not found.

- **Update Order Status to Delivered**
  - `PATCH /orders/:id/deliver`
  - **Responses:**
    - `200 OK` - Order status updated to delivered.
    - `404 Not Found` - Order not found.

### Cart and Wishlist

- **View Cart**
  - `GET /cart`
  - **Responses:**
    - `200 OK` - Returns the user's cart.

- **Add to Cart**
  - `POST /cart`
  - **Request Body:**
    ```json
    {
      "productId": "ObjectId",
      "quantity": "number"
    }
    ```
  - **Responses:**
    - `200 OK` - Product added to cart successfully.

- **Update Cart**
  - `PATCH /cart`
  - **Request Body:**
    ```json
    {
      "productId": "ObjectId",
      "quantity": "number"
    }
    ```
  - **Responses:**
    - `200 OK` - Cart updated successfully.

- **Remove from Cart**
  - `DELETE /cart`
  - **Request Body:**
    ```json
    {
      "productId": "ObjectId"
    }
    ```
  - **Responses:**
    - `200 OK` - Product removed from cart successfully.

- **Add to Wishlist**
  - `POST /wishlist`
  - **Request Body:**
    ```json
    {
      "productId": "ObjectId"
    }
    ```
  - **Responses:**
    - `200 OK` - Product added to wishlist successfully.

- **Remove from Wishlist**
  - `DELETE /wishlist`
  - **Request Body:**
    ```json
    {
      "productId": "ObjectId"
    }
    ```
  - **Responses:**
    - `200 OK` - Product removed from wishlist successfully.

## Middleware

### Authentication and Authorization

- **validateToken**: Middleware to check if the request has a valid JWT token.
- **admin**: Middleware to restrict access to admin users.

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
#Install Dependencies
npm install

#Set Up Environment Variables

MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_jwt_secret
EMAIL=your_email
EMAIL_PASSWORD=your_email_password

#Run the Application
npm start
