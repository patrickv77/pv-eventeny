class UserService {
  constructor(user){
    this.user = user;
  }

  findUser = async (username) => {
    try {
      const foundUser = await this.user.findOne({ where: { username: username } });

      return foundUser;
    } catch (error) {
      throw new Error('Error finding user with matching username')
    }
    
  }

  setRegistrationErrors(foundUser, username, password, password2, role) {
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
  }

  createUser = async (username, password, role) => {
    try {
      const newUser = await this.user.create({ username: username, password: password, role: role });
      
      return newUser;
    } catch (error) {
      throw new Error('Error creating new user');
    }
    
  }
}

module.exports = UserService;