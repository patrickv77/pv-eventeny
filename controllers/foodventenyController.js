const { db, user, application } = require('../db/models');

// functions to be used locally
// function checkRole(username) {
//   for(let user of db) {
//     if(user.username === username) return user.role;
//   }
  
//   return "ERROR: User not found"
// }

// functions to be exported
const foodventenyController = {};

foodventenyController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const foundUser = await user.findOne({ where: { username: username, password: password } });

    if(foundUser === null){
      // TODO: deal with user not found here
    }else{
      res.locals.userRole = foundUser.role;
      res.locals.userID = foundUser.id;
    }

    return next();
  } catch (error) {
    console.log(error);
  }
}

foodventenyController.addUser = async (req, res, next) => {
  const { username, password, password2, role } = req.body;
  
  if(password !== password2) {
    return "ERROR: passwords do not match"  
  }

  // TODO: verify username doesnt already exist

  try { 
    await user.create({ username: username, password: password, role: role});

    return next();
  } catch (error) {
    console.log(error);
  }
}

foodventenyController.getApps = async (req, res, next) => {
  try {
    const dbApps = await application.findAll();

    if(res.locals.userRole === 'admin'){
      
      res.locals.userArray = dbApps;
      return next();
    } else if (res.locals.userRole === 'user'){
      const userAppArray = [];
      for(let app of dbApps) {
        if(app.user_id === res.locals.userID) userAppArray.push(app);
      }

      res.locals.userArray = userAppArray;
      return next();
    }else{
      return "ERROR: Not a valid role"
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