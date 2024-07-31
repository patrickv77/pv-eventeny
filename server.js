const express = require('express');
const session = require('express-session');
const passport = require('passport');

const apiRouter = require('./routes/api');
const viewsRouter = require('./routes/views');
const userRouter = require('./routes/userRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret:'foodventeny_secret',
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

// Routes
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
