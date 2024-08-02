const express = require('express');
const createDIContainer = require('../diContainer');

const { applicationTemplateController } = createDIContainer;

const router = express.Router();

router.get('/', applicationTemplateController.getAllApplicationTemplates);

router.get('/new', applicationTemplateController.loadTemplateForm);

router.post('/', applicationTemplateController.createNewApplicationTemplate);

router.get('/vendors', applicationTemplateController.getAllVendorTypes);

module.exports = router;
