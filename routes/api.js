const express = require('express');

const foodventenyController = require('../controllers/foodventenyController');

const router = express.Router();

// ADD STARTER DATA REQUEST ROUTE HANDLER HERE
router.get('/',
  foodventenyController.getApps,
  (req, res) => {
    return res.status(200).json(res.locals.userArray);
  }
);

// ADD GET MORE CHARACTERS ROUTE HANDLER HERE


module.exports = router;
