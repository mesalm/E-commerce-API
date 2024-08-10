/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - items
 *         - totalAmount
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the order
 *         user:
 *           type: string
 *           description: The id of the user who placed the order
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The id of the product
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *         totalAmount:
 *           type: number
 *           description: The total amount of the order
 *         status:
 *           type: string
 *           enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
 *           description: The status of the order
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the order was created
 *       example:
 *         id: d5fE_asz
 *         user: 60d21b4667d0d8992e610c85
 *         items: 
 *           - product: 60d21b8667d0d8992e610c87
 *             quantity: 2
 *             price: 199.99
 *         totalAmount: 399.98
 *         status: Pending
 *         createdAt: 2023-08-10T12:34:56.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: The id of the product
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the product
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *     responses:
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add items to the order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: The id of the product
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the product
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *     responses:
 *       201:
 *         description: The items were successfully added to the order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by id
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders/{id}/pay:
 *   patch:
 *     summary: Update order to paid
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order was successfully updated to paid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders/{id}/deliver:
 *   patch:
 *     summary: Update order to delivered
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order was successfully updated to delivered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 *       401:
 *         description: Unauthorized
 */


const express = require('express');
const {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    createOrder,
} = require('../controller/orderController');
const router = express.Router();
const validateToken = require('../Middleware/validatToken')
const admin = require('../Middleware/admin');

router.post('/create',validateToken , createOrder);

router.post('/',validateToken, addOrderItems);
router.get('/:id',validateToken, getOrderById);
router.patch('/:id/pay',validateToken, updateOrderToPaid);
router.patch('/:id/deliver',validateToken, admin, updateOrderToDelivered);

module.exports = router;
