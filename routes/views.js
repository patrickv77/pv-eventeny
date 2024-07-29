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

router.get('/adminDashboard', foodventenyController.getApps,
  (req, res) => {
  const applicationList = res.locals.appArray;

  res.render('adminDashboard', { applicationList });
});

router.get('/userDashboard', foodventenyController.getApps, 
  (req, res) => {
  const applicationList = res.locals.appArray;

  res.render('userDashboard', { applicationList });
});

router.get('/adminAppTemplates',
  foodventenyController.getAppTemplates, 
  (req, res) => {
  const appTemplatesList = res.locals.appTemplatesList;

  res.render('adminAppTemplates', { appTemplatesList })
});

router.get('/newTemplate', (req, res) => {
  res.render('newTemplate');
})

module.exports = router;