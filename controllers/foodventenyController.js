const { db, user, application } = require('../db/models');
const bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(10);

// functions for use locally

// function that hashes a password for storage in the database
async function hashPass(unhashedPassword) {
  const hashedPassword = await bcrypt.hash(unhashedPassword, salt);

  return hashedPassword;
}

// functions to be exported
const foodventenyController = {};

foodventenyController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const foundUser = await user.findOne({ where: { username: username } });
    // check password
    const compare = bcrypt.compareSync(password, foundUser.password);

    if(foundUser === null){
      // TODO: deal with user not found here
      return res.status(401).json('User not found');
    }else if(!compare){ 
      // TODO: deal with password not matching
      return res.status(401).json('Wrong password');
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
  
  let registrationErrors = [];

  const foundUser = await user.findOne({ where: { username: username } })

  if(foundUser !== null) {
    registrationErrors.push({ message: "Username already exists" })
  }

  if(!username || !password || !password2 || !role){
    registrationErrors.push({ message: "Please enter all fields" });
  }

  if(password !== password2) {
    registrationErrors.push({ message: "Passwords do not match" }); 
  }

  if(registrationErrors.length > 0) {
    res.render('register', { registrationErrors });
  } else {
    const hashword = await hashPass(password);
    console.log(hashword)

    try { 
      await user.create({ username: username, password: hashword, role: role});
  
      return next();
    } catch (error) {
      console.log(error);
    }
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