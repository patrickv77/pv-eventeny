const LocalStrategy = require('passport-local').Strategy;
const { user } = require('./db/models/');
const bcrypt = require('bcryptjs');

function initializePassport(passport) {
  const authenticateUser = async (username, password, done) => {
    const foundUser = await user.findOne({ where: { username: username } });
    
    if(foundUser){
      bcrypt.compare(password, foundUser.password, (err, isMatch) => {
        if(err) throw err;

        if(isMatch) return done(null,foundUser);
        else return done(null, false, { message: 'incorrect password' });
      })
    }else{
      return done(null, false, { message: 'user not found' });
    }
  };
  
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( async (id, done) => {
    const userInfo = await user.findOne({ where: { id: id } });

    const storedUserInfo = {
      id: userInfo.id,
      username: userInfo.username,
      role: userInfo.role,
    }

    return done(null, storedUserInfo);
  });
}

module.exports = initializePassport;