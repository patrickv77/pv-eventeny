const express = require('express');

const foodventenyController = require('../controllers/foodventenyController');

const router = express.Router();

// ADD STARTER DATA REQUEST ROUTE HANDLER HERE
router.post('/test/user',
  foodventenyController.verifyUser,
  foodventenyController.getApps,
  (req,res) => {
    return res.status(200).json(res.locals.userArray);
  }
  // (req, res) => {
  //   return res.status(200).json(res.locals.userArray);
  // }
);

module.exports = router;
