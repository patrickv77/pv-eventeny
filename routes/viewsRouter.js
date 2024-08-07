const express = require('express');

const router = express.Router();

/**
 * Route to render index view.
 * @name GET /
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get('/', (req, res) => {
  res.render('index');
});

/**
 * Route to render register view.
 * @name GET /
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get('/register', (req, res) => {
  res.render('register');
});

/**
 * Route to render login view.
 * @name GET /
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;