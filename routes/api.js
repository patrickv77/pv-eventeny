const express = require('express');

const foodventenyController = require('../controllers/foodventenyController');

const router = express.Router();

router.post('/register', 
  foodventenyController.addUser, 
  (req, res) => {

    res.redirect('/login');
});

router.put('/status/:id', 
  foodventenyController.updateAppStatus, 
  (req, res) => {

  return res.status(200).json('Successfully updated status.');
});

router.post('/templates',
  foodventenyController.createApplicationTemplate,
  (req, res) => {
    
    res.redirect('/adminAppTemplates');
  }
);

router.post('/submission',
  foodventenyController.submitApplication,
  (req, res) => {

    res.redirect('/dashboard');
  }
);

module.exports = router;

// TODO:
// delete route for application templates
// delete route for user application submissions