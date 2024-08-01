const express = require('express');
const createDIContainer = require('../diContainer');

const { applicationController } = createDIContainer;

const router = express.Router();

router.post('/register', applicationController);

module.exports = router;