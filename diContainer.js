const { user } = require('./db/models');
const UserService = require('./services/UserService');
const UserController = require('./controllers/UserController');

createDIContainer = {};

const userService = new UserService(user);
const userController = new UserController(userService);


createDIContainer.userController = userController;


module.exports = createDIContainer;