const express = require('express');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passportConfig');

const viewsRouter = require('./routes/viewsRouter');
const userRouter = require('./routes/userRouter');
const applicationRouter = require('./routes/applicationRouter');
const applicationTemplateRouter = require('./routes/applicationTemplateRouter');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Sets up the view engine to use EJS templates.
 */
app.set('view engine', 'ejs');

/**
 * Middleware to parse JSON and URL-encoded data.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

/**
 * Session middleware configuration.
 */
app.use(
  session({
    secret: 'foodventeny_secret',
    resave: false,
    saveUninitialized: false,
  })
);

/**
 * Initializes Passport for authentication.
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Initializes Passport configuration.
 * @param {Object} passport - The Passport object.
 */
initializePassport(passport);

/**
 * Passport Authentication Route
 * @name POST /login
 * @function
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: false,
  }),
  (req, res) => {
    console.log('User authentication complete');
    res.redirect('/apps');
  }
);

/**
 * Application Template Routes
 * @name /template
 */
app.use('/template', applicationTemplateRouter);

/**
 * Application Routes
 * @name /apps
 */
app.use('/apps', applicationRouter);

/**
 * User Routes
 * @name /user
 */
app.use('/user', userRouter);

/**
 * View Routes
 * @name /
 */
app.use('/', viewsRouter);

/**
 * Catch-all route handler for any requests to an unknown route
 * @function
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
app.use((req, res) => res.sendStatus(404));

/**
 * Global error handler
 * @function
 * @param {Object} err - Error object.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.error('We have entered our global error handler: ');
  console.log('Our error message is: ', errorObj.log);
  const errorStatus = errorObj.status || 500;
  return res.status(errorStatus).send(errorObj.message);
});

/**
 * Starts the server and listens on the specified port.
 * @function
 */
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
