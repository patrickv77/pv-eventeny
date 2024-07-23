const path = require('path');
const express = require('express');
const { db, user, application } = require('./db/models/');

const foodventenyController = require('./controllers/foodventenyController');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api', apiRouter);

app.post('/test/route', async (req, res) => {
  const { username, password, role } = req.body;

  try{
    const testUser = await user.create({ username, password, role });

    return res.status(200).json(testUser);
  } catch(error){
    console.log(error);
    return res.status(500).json(error);
  }
  
});

app.get('/test/route', async (req, res) => {
  try {
    const apps = await application.findAll();

    return res.json(apps);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}) 


app.get('/', (req, res) => {
  res.render('index')
});

app.get('/users/register', (req, res) => {
  res.render('register');
})

app.get('/users/login', (req, res) => {
  res.render('login');
})

app.get('/users/dashboard', (req, res) => {
  res.render('dashboard', {user: 'pat'});
})

app.get('/test', async (req, res) => {
  const users = await db.select().from('users');
  res.json(users);
})

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