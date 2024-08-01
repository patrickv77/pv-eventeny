const express = require('express');
const createDIContainer = require('../diContainer');

const { applicationController } = createDIContainer;

const router = express.Router();

router.get('/', applicationController.getApplications);

router.put('/status/:id', applicationController.updateApplicationStatus);

router.post('/', 
  applicationController.submitUserApplication,
  applicationController.getApplications
);

module.exports = router;