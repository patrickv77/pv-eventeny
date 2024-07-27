const express = require('express');

const foodventenyController = require('../controllers/foodventenyController');

const router = express.Router();

router.post('/login',
  foodventenyController.verifyUser,
  foodventenyController.getApps,
  (req, res) => {
    const applicationList = res.locals.appArray;

    if (res.locals.userRole === 'admin') {
      res.render('adminDashboard', { applicationList });
    } else {
      res.render('userDashboard', { applicationList });
    }
  }
);

router.post('/register', 
  foodventenyController.addUser, 
  (req, res) => {
  return res.status(200).json('Registration successful.');
});

router.put('/status/:id',
  foodventenyController.updateAppStatus,
  (req, res) => {
    return res.status(200).json('Status update successful.')
  }
);

router.get('/templates', 
  foodventenyController.getAppTemplates,
  (req, res) => {
    const appTemplatesList = res.locals.appTemplatesList;

    res.render('adminAppTemplates', { appTemplatesList });
  }
);

router.post('/templates',
  foodventenyController.createApplicationTemplate,
  foodventenyController.getAppTemplates,
  (req, res) => {
    const appTemplatesList = res.locals.appTemplatesList;
    res.render('adminAppTemplates', { appTemplatesList })
  }
)

router.get('/createApp',
  foodventenyController.getVendorTypes,
  (req, res) => {
    const vendorTypes = res.locals.vendorTypesList;
    res.render('submitApp', { vendorTypes });
  }
);

router.post('/submission',
  foodventenyController.submitApplication,
  (req, res) => {
    
    res.render()
  }
)

module.exports = router;
