const express = require('express');
const session = require('express-session');
const passport = require('passport');

const apiRouter = require('./routes/apiRouter')
const viewsRouter = require('./routes/viewsRouter')
const userRouter = require('./routes/userRouter')
const applicationRouter = require('./routes/applicationRouter')

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'foodventeny_secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// passport setup
const initializePassport = require('./passportConfig');
initializePassport(passport);

// passport route
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: false,
  }),
  (req, res) => {
    console.log('User authentication complete')
    res.redirect('/apps');
  }
);

const { db, user, application, application_template } = require('./db/models');

/*
app.get('/test', async (req, res) => {
  const a = await application.findAll({
    include: [
      {
        model: user,
        where: { id: 2 },
        attributes: ['username'],
      },
      {
        model: application_template,
        attributes: ['vendor_type'],
      },
    ],
    attributes: [
      'id',
      'first_name',
      'last_name',
      'phone_number',
      'email',
      'vendor_type_id',
      'description',
      'status',
    ],
  });

  for (b of a) {
    console.log('==========================')
    console.log(b.id);
    console.log(b.user.username);
    console.log(b.first_name);
    console.log(b.last_name);
    console.log(b.phone_number);
    console.log(b.email);
    console.log(b.application_template.vendor_type);
    console.log(b.description);
    console.log(b.status);
  }
  return res.status(200).json(a);
});
*/

// Routes
app.use('/apps', applicationRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/', viewsRouter);

// Catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// Global error handler
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

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
