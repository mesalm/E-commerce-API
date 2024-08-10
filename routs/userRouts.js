/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number
 *         role:
 *           type: string
 *           description: The user's role (user or admin)
 *         active:
 *           type: boolean
 *           description: Indicates if the user is active
 *       example:
 *         id: d5fE_asz
 *         username: JohnDoe
 *         email: john.doe@example.com
 *         password: 123456
 *         phoneNumber: "+1234567890"
 *         role: user
 *         active: true
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /users/current/{id}:
 *   patch:
 *     summary: Update user data
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *     responses:
 *       200:
 *         description: Email sent with further instructions
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/reset-password/{token}:
 *   post:
 *     summary: Reset password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token or token expired
 */

/**
 * @swagger
 * /users/update-status:
 *   patch:
 *     summary: Update user status (active or inactive)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user id
 *               active:
 *                 type: boolean
 *                 description: The user status
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       400:
 *         description: Invalid input
 */
const express =require('express');
const router = express.Router();
const {
    Register_user,
    login_user,
    update_userData,
    forget_password,
   reset_password,
   updateUserStatus

}= require('../controller/userController');
const valiadToken = require('../Middleware/validatToken')
const admin = require('../Middleware/admin')

router.route('/update-status', valiadToken ,admin, updateUserStatus)
router.post('/register',Register_user)
router.post('/login',login_user)
router.patch('/current/:id',valiadToken,update_userData)
router.post('/forgot-password',forget_password);
router.post('/reset-password/:token', reset_password);


module.exports = router;