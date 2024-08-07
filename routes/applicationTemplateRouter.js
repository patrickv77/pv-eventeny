const express = require('express');
const ApplicationTemplateController = require('../controllers/ApplicationTemplateController');
const applicationTemplateController = new ApplicationTemplateController();

const router = express.Router();

/**
 * Route to get application templates.
 * @name GET /
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get('/', applicationTemplateController.getAllApplicationTemplates);

/**
 * Route to load template form.
 * @name GET /new
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get('/new', applicationTemplateController.loadTemplateForm);

/**
 * Route to create new application template.
 * @name POST /
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.post('/', applicationTemplateController.createNewApplicationTemplate);

/**
 * Route to get a list of vendor types.
 * @name GET /vendors
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get('/vendors', applicationTemplateController.getAllVendorTypes);

module.exports = router;
