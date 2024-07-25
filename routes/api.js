const express = require('express');

const foodventenyController = require('../controllers/foodventenyController');

const router = express.Router();

// ADD STARTER DATA REQUEST ROUTE HANDLER HERE
router.post('/login',
  foodventenyController.verifyUser,
  foodventenyController.getApps,
  (req, res) => {
    const applicationList = res.locals.appArray;

    res.render('userDashboard', { applicationList })
  }
);

router.post('/register',
  foodventenyController.addUser,
  (req, res) => {
    return res.status(200).json('Registration successful.')
  }
)

module.exports = router;
