const { db, user, application } = require('../db/models');

// functions to be used locally
function checkRole(username) {
  for(let user of db) {
    if(user.username === username) return user.role;
  }
  
  return "ERROR: User not found"
}

// functions to be exported
const foodventenyController = {};

foodventenyController.getApps = async (req, res, next) => {
  try {
    // req.body will contain a username or role
    let username = 'pat3';
    if(checkRole(username) === 'admin'){
      // return array of apps
      res.locals.userArray = dbApps;
      return next();
    }else if(checkRole(username) === 'user'){
      const userAppArray = [];
      for(let app of dbApps) {
        if(app.user === username) userAppArray.push(app);
      }

      res.locals.userArray = userAppArray;
      return next();
    }else{
      return "ERROR: User not found"
    }

  } catch (error) {
    console.log(error);
  }
}

foodventenyController.updateAppStatus = async (req, res, next) => {
  try {
    // req.body will contain the id of the app to be updated
    let appId = 5;
    for(let app of dbApps) {
      if(app.id === appId) app.status = 'approved'
    }

    console.log(dbApps[4].status);
    return 'Success'
  } catch (error) {
    console.log(error); 
  }
}

module.exports = foodventenyController;

// console.log(checkRole('pat1'));
// console.log(foodventenyController.getApps())
// console.log(foodventenyController.updateAppStatus());
// console.log(foodventenyController.getApps())