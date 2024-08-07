const bcrypt = require('bcryptjs');
const { user } = require('../db/models')

/**
 * @class UserService
 * @classdesc Service class for handling user-related operations.
 */
class UserService {
  /**
   * Finds a user by username.
   * @function findUser
   * @memberof UserService
   * @async
   * @param {string} username - The username to search for.
   * @returns {Promise<Object|null>} - A promise that resolves to the found user object or null if not found.
   * @throws {Error} - Throws an error if there is an issue finding the user.
   */
  findUser = async (username) => {
    try {
      const foundUser = await user.findOne({
        where: { username: username },
      });

      return foundUser;
    } catch (error) {
      throw new Error('Error finding user with matching username');
    }
  };

  /**
   * Sets registration errors based on input validation.
   * @function setRegistrationErrors
   * @memberof UserService
   * @param {Object | null} foundUser - The user object if a user is found, otherwise null.
   * @param {string} username - The username to validate.
   * @param {string} password - The password to validate.
   * @param {string} password2 - The confirmation password to validate.
   * @param {string} role - The role to validate.
   * @returns {Array<Object>} - An array of error objects with error messages.
   */
  setRegistrationErrors = (foundUser, username, password, password2, role) => {
    const registrationErrors = [];

    if (foundUser !== null) {
      registrationErrors.push({ message: 'Username already exists' });
    }

    if (!username || !password || !password2 || !role) {
      registrationErrors.push({ message: 'Please enter all fields' });
    }

    if (password !== password2) {
      registrationErrors.push({ message: 'Passwords do not match' });
    }

    return registrationErrors;
  };

  /**
   * Creates a new user with the given details.
   * @function createUser
   * @memberof UserService
   * @async
   * @param {string} username - The username of the new user.
   * @param {string} password - The password for the new user.
   * @param {string} role - The role assigned to the new user.
   * @returns {Promise<Object>} - A promise that resolves to the created user object.
   * @throws {Error} - Throws an error if there is an issue creating the user.
   */
  createUser = async (username, password, role) => {
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await user.create({
        username: username,
        password: encryptedPassword,
        role: role,
      });

      return newUser;
    } catch (error) {
      throw new Error('Error creating new user');
    }
  };
}

module.exports = UserService;
