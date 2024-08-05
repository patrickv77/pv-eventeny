const express = require('express');
const ApplicationController = require('../controllers/ApplicationController');
const applicationController = new ApplicationController;

const router = express.Router();

router.get('/', applicationController.getApplications);

router.put('/status/:id', applicationController.updateApplicationStatus);

router.post('/', applicationController.submitUserApplication, applicationController.getApplications);

module.exports = router;