const express = require('express');
const createDIContainer = require('../diContainer');

const { applicationTemplateController } = createDIContainer;

const router = express.Router();

module.exports = router;