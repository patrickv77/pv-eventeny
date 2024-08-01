const bcrypt = require('bcryptjs');

class ApplicationController {
  constructor(ApplicationService) {
    this.ApplicationService = ApplicationService;
  }

  addUser = async (req, res, next) => {
    const { username, password, password2, role } = req.body;

    try {
      const foundUser = await this.UserService.findUser(username);

      const registrationErrors = this.UserService.setRegistrationErrors(foundUser, username, password, password2, role);

      if (registrationErrors.length > 0) {
        res.render('register', { registrationErrors });
      } else {
        // const encryptedPassword = this.AuthorizationService(password);
        const encryptedPassword = await bcrypt.hash(password, 10);


        const newUser = await this.UserService.createUser( username, encryptedPassword, role );
  
        return res.status(201).json(newUser);
      }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  }

}

module.exports = ApplicationController;