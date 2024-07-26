const express = require('express');

const foodventenyController = require('../controllers/foodventenyController');

const router = express.Router();

// ADD STARTER DATA REQUEST ROUTE HANDLER HERE
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

module.exports = router;
