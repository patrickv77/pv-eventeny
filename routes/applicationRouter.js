const express = require('express');
const ApplicationController = require('../controllers/ApplicationController');
const applicationController = new ApplicationController();

const router = express.Router();

/**
 * Route to get applications.
 * @name GET /
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get('/', applicationController.getApplications);

/**
 * Route to update the status of an application.
 * @name PUT /status/:id
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.put('/status/:id', applicationController.updateApplicationStatus);

/**
 * Route to submit a new user application.
 * @name POST /
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.post('/', applicationController.submitUserApplication, applicationController.getApplications);

module.exports = router;