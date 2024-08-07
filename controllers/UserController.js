const express = require('express');
const UserService = require('../services/UserService')
const userService = new UserService();

/**
 * @class UserController
 * @classdesc Controller class for handling user-related operations.
 */
class UserController {
  /**
   * Adds a new user to the database.
   * @function addUser
   * @memberof UserController
   * @async
   * @param {express.Request} req - The request object, containing user details in the body.
   * @param {express.Response} res - The response object.
   * @param {express.NextFunction} next - The next middleware function.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  addUser = async (req, res, next) => {
    const { username, password, password2, role } = req.body;

    try {
      const foundUser = await userService.findUser(username);

      const registrationErrors = userService.setRegistrationErrors(foundUser, username, password, password2, role);

      if (registrationErrors.length > 0) {
        res.render('register', { registrationErrors });
      } else {
        const newUser = await userService.createUser( username, password, role );
  
        return res.status(201).redirect('/login');
      }
    } catch (error) {
        return next(error);
    }
  }

  /**
   * Logs out the user by destroying the session and redirecting to the login page.
   * @function logoutUser
   * @memberof UserController
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @param {express.NextFunction} next - The next middleware function.
   * @returns {void}
   */
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