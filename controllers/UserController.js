class UserController {
  constructor(UserService) {
    this.UserService = UserService;
  }

  addUser = async (req, res, next) => {
    const { username, password, password2, role } = req.body;

    try {
      const foundUser = await this.UserService.findUser(username);

      const registrationErrors = this.UserService.setRegistrationErrors(foundUser, username, password, password2, role);

      if (registrationErrors.length > 0) {
        // add backend error here
        res.render('register', { registrationErrors });
      } else {
        const newUser = await this.UserService.createUser( username, password, role );
  
        return res.status(201).json(newUser);
      }
    } catch (error) {
        return next(error);
    }
  }

  logoutUser = (req, res, next) => {
    try {
      req.session.destroy((error) => {
        if(!error) {
          return res.redirect('/login');
        }
        
        return next(error);
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = UserController;