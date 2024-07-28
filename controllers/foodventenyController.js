const { db, user, application, app_template } = require('../db/models');
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

  console.log(req.user.username);
  console.log(req.user.password);
  console.log(req.user.role);
  try {
    const foundUser = await user.findOne({ where: { username: username } });
    // check password
    const compare = bcrypt.compareSync(password, foundUser.password);

    if (foundUser === null) {
      // TODO: deal with user not found here
      return res.status(401).json('User not found');
    } else if (!compare) {
      // TODO: deal with password not matching
      return res.status(401).json('Wrong password');
    } else {
      res.locals.userRole = foundUser.role;
      res.locals.username = foundUser.username;
    }

    return next();
  } catch (error) {
    console.log(error);
  }
};

foodventenyController.addUser = async (req, res, next) => {
  const { username, password, password2, role } = req.body;

  const registrationErrors = [];

  const foundUser = await user.findOne({ where: { username: username } });

  if (foundUser !== null) {
    registrationErrors.push({ message: 'Username already exists' });
  }

  if (!username || !password || !password2 || !role) {
    registrationErrors.push({ message: 'Please enter all fields' });
  }

  if (password !== password2) {
    registrationErrors.push({ message: 'Passwords do not match' });
  }

  if (registrationErrors.length > 0) {
    res.render('register', { registrationErrors });
  } else {
    const hashword = await hashPass(password);
    console.log(hashword);

    try {
      await user.create({ username: username, password: hashword, role: role });

      return next();
    } catch (error) {
      console.log(error);
    }
  }
};

foodventenyController.getApps = async (req, res, next) => {
  try {
    const dbApps = await application.findAll();

    for (app of dbApps) {
      const tempUser = await user.findOne({ where: { id: app.user_id } });
      const vendor = await app_template.findOne({ where: { id: app.vendor_space } });

      app.user_id = tempUser.username;
      app.vendor_space = vendor.vendor_type;
    }

    if (res.locals.userRole === 'admin') {
      res.locals.appArray = dbApps;
      return next();
    } else if (res.locals.userRole === 'user') {
      const userAppArray = [];
      for (let app of dbApps) {
        if (app.user_id === res.locals.username) userAppArray.push(app);
      }

      res.locals.appArray = userAppArray;
      return next();
    } else {
      return 'ERROR: Not a valid role';
    }
  } catch (error) {
    console.log(error);
  }
};

foodventenyController.updateAppStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    await application.update({ status: status }, { where: { id: id } });

    return 'Success';
  } catch (error) {
    console.log(error);
  }
};

foodventenyController.getAppTemplates = async (req, res, next) => {
  const appsList = await app_template.findAll();

  res.locals.appTemplatesList = appsList;

  return next();
}

foodventenyController.createApplicationTemplate = async (req, res, next) => {
  const { vendor_type } = req.body;
  app_template.create({ vendor_type: vendor_type });

  return next();
};

foodventenyController.getVendorTypes = async (req, res, next) => {
  res.locals.vendorTypesList = await app_template.findAll({attributes: ['vendor_type']}).then(apps => apps.map(app => app.vendor_type));
  
  return next();
}

foodventenyController.submitApplication = async (req, res, next) => {
  const { vendorType, description } = req.body;
  
};

module.exports = foodventenyController;