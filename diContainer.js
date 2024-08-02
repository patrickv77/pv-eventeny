const { user, application, application_template } = require('./db/models');
const UserService = require('./services/UserService');
const UserController = require('./controllers/UserController');
const ApplicationService = require('./services/ApplicationService');
const ApplicationController = require('./controllers/ApplicationController');
const ApplicationTemplateService = require('./services/ApplicationTemplateService');
const ApplicationTemplateController = require('./controllers/ApplicationTemplateController');

createDIContainer = {};

const userService = new UserService(user);
const userController = new UserController(userService);

const applicationService = new ApplicationService(application, user, application_template);
const applicationController = new ApplicationController(applicationService);

const applicationTemplateService = new ApplicationTemplateService(application_template);
const applicationTemplateController = new ApplicationTemplateController(applicationTemplateService);

createDIContainer.userController = userController;
createDIContainer.applicationController = applicationController;
createDIContainer.applicationTemplateController = applicationTemplateController;

module.exports = createDIContainer;