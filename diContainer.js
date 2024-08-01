const { user, application } = require('./db/models');
const UserService = require('./services/UserService');
const UserController = require('./controllers/UserController');
const ApplicationService = require('./services/ApplicationService');
const ApplicationController = require('./controllers/ApplicationController');

createDIContainer = {};

const userService = new UserService(user);
const userController = new UserController(userService);

const applicationService = new ApplicationService(application);
const applicationController = new ApplicationController(applicationService);


createDIContainer.userController = userController;


module.exports = createDIContainer;