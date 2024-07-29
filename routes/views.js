const express = require('express');

const foodventenyController = require('../controllers/foodventenyController');

const router = express.Router();

// views routes
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard',
  foodventenyController.getApps,
  (req, res) => {
    const dash = {};
    dash.applicationList = res.locals.appArray;
    dash.role = req.user.role;

    res.render('dashboard', { dash });
});

router.get('/adminAppTemplates',
  foodventenyController.getAppTemplates, 
  (req, res) => {
  const appTemplatesList = res.locals.appTemplatesList;

  res.render('adminAppTemplates', { appTemplatesList })
});

router.get('/submitApp', foodventenyController.getVendorTypes, (req, res) => {
  const vendorTypes = res.locals.vendorTypesList;
  res.render('submitApp', { vendorTypes });
});

router.get('/newTemplate', (req, res) => {
  res.render('newTemplate');
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

module.exports = router;