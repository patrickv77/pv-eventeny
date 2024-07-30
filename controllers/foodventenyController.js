const e = require('express');
const { db, user, application, app_template } = require('../db/models');
const bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(10);

// hashes a password for storage in the database
async function hashPass(unhashedPassword) {
  const hashedPassword = await bcrypt.hash(unhashedPassword, salt);

  return hashedPassword;
}

// functions to be exported
const foodventenyController = {};
  
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

    try {
      await user.create({ username: username, password: hashword, role: role });

      return next();
    } catch (error) {
      return next(error);
    }
  }
};

foodventenyController.getApps = async (req, res, next) => {
  try {
    const dbApps = await application.findAll();

    for (app of dbApps) {
      const tempUser = await user.findOne({ where: { id: app.user_id } });
      const vendor = await app_template.findOne({
        where: { id: app.vendor_space },
      });

      app.user_id = tempUser.username;
      app.vendor_space = vendor.vendor_type;
    }

    if (req.user.role === 'admin') {
      res.locals.appArray = dbApps;
      return next();
    } else if (req.user.role === 'user') {
      const userAppArray = [];
      for (let app of dbApps) {
        if (app.user_id === req.user.username) userAppArray.push(app);
      }

      res.locals.appArray = userAppArray;
      return next();
    } else {
      throw new Error('ERROR: Not a valid role');
    }
  } catch (error) {
    return next(error);
  }
};

foodventenyController.updateAppStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    await application.update({ status: status }, { where: { id: id } });

    return next();
  } catch (error) {
    return next(error);
  }
};

foodventenyController.getAppTemplates = async (req, res, next) => {
  try {
    const appsList = await app_template.findAll();

    res.locals.appTemplatesList = appsList;

    return next();
  } catch (error) {
    return next(error);
  }
};

foodventenyController.createApplicationTemplate = async (req, res, next) => {
  const { vendor_type } = req.body;

  try {
    await app_template.create({ vendor_type: vendor_type });

    return next();
  } catch (error) {
    return next(error);
  }
};

foodventenyController.getVendorTypes = async (req, res, next) => {
  try {
    res.locals.vendorTypesList = await app_template
      .findAll({ attributes: ['vendor_type'] })
      .then((apps) => apps.map((app) => app.vendor_type));

    return next();
  } catch (error) {
    return next(error);
  }
};

foodventenyController.submitApplication = async (req, res, next) => {
  const { vendorType, description } = req.body;

  try {
    const vendor = await app_template.findOne({
      where: { vendor_type: vendorType },
    });
    await application.create({
      user_id: req.user.id,
      vendor_space: vendor.id,
      description: description,
      status: 'awaiting_action',
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = foodventenyController;

/*

  split controller and routes to reflect responsibility
  ie app_templateController, application controller, etc.

  look into RSCs (services for controllers)

*/