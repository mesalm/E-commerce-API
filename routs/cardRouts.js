/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The id of the product
 *         quantity:
 *           type: number
 *           description: The quantity of the product
 *       example:
 *         productId: 60d21b8667d0d8992e610c87
 *         quantity: 2
 *     WishlistItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The id of the product
 *       example:
 *         productId: 60d21b8667d0d8992e610c87
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The cart management API
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The cart items of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: The product was successfully added to the cart
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /cart:
 *   patch:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The id of the product
 *               quantity:
 *                 type: number
 *                 description: The new quantity of the product
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       200:
 *         description: The quantity was successfully updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The id of the product
 *             required:
 *               - productId
 *     responses:
 *       200:
 *         description: The product was successfully removed from the cart
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: The wishlist management API
 */

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add a product to the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishlistItem'
 *     responses:
 *       200:
 *         description: The product was successfully added to the wishlist
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /wishlist:
 *   delete:
 *     summary: Remove a product from the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The id of the product
 *             required:
 *               - productId
 *     responses:
 *       200:
 *         description: The product was successfully removed from the wishlist
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
const express = require('express');
const router = express.Router();
const { 
    addToCart, 
    removeFromCart, 
    addToWishlist, 
    removeFromWishlist ,
    viewCard,
    updateCart,
} = require('../controller/cardController');
const validateToken = require('../Middleware/validatToken');

router.get('/cart', validateToken, viewCard);
router.post('/cart', validateToken, addToCart);
router.patch('/cart', validateToken, updateCart);
router.delete('/cart', validateToken, removeFromCart);
router.post('/wishlist', validateToken, addToWishlist);
router.delete('/wishlist', validateToken, removeFromWishlist);

module.exports = router;
