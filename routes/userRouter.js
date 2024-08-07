const express = require('express');
const UserController = require('../controllers/UserController');
const userController = new UserController();

const router = express.Router();

/**
 * Route to register user.
 * @name POST /register
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.post('/register', userController.addUser);

/**
 * Route to logout of the application.
 * @name GET /logout
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get('/logout', userController.logoutUser);

module.exports = router;