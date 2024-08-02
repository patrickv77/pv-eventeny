const express = require('express');
const createDIContainer = require('../diContainer');

const { userController } = createDIContainer;

const router = express.Router();

router.post('/register', userController.addUser);

router.get('/logout', userController.logoutUser);

module.exports = router;