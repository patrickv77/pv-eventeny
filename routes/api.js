const express = require('express');
const passport = require('passport');

const initializePassport = require('../passportConfig');
initializePassport(passport);

const foodventenyController = require('../controllers/foodventenyController');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: false,
  }),
  (req, res) => {
    if (req.user.role === 'admin') {
      res.redirect('/adminDashboard');
    } else {
      res.redirect('/userDashboard');
    }
  }
);

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

router.post(
  '/templates',
  foodventenyController.createApplicationTemplate,
  (req, res) => {
    
    res.redirect('/adminAppTemplates');
  }
);

// router.get('/createApp', foodventenyController.getVendorTypes, (req, res) => {
//   const vendorTypes = res.locals.vendorTypesList;
//   res.render('submitApp', { vendorTypes });
// });

router.post(
  '/submission',
  foodventenyController.submitApplication,
  (req, res) => {

    res.redirect('/userDashboard');
  }
);



module.exports = router;
