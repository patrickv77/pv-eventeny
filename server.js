const http = require('http');
// const url = require('url');
const db = require('./db/models/index')
const foodventenyController = require('./controllers/foodventenyController');

const onError = 'onError';
const onListening = 'onListening';

const server = http.createServer(async (req, res) => {
  // const parsedURL = url.parse(req.url, true);

  // if(req.method ==='GET' && req.url === '/'){
  //   try {
  //     const users = await db.users.findAll();
  //     res.render("index", { users });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // if(req.method === 'POST' && req.url === '/') {
  //   try{
  //     const newUser = await db.users.create({...req.body});
  //     res.json(newUser);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  if(req.url === '/' && req.method === 'GET'){
    foodventenyController.getApps(req,res);
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(res.locals.userArray);
  }

  if(req.url === '/hello' && req.method === 'GET'){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('<h1>Hello World 2</h1>');
  }else{
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Route Not Found'}));
  }
  
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
db.sequelize.sync({ force: false }).then(function () {
  // server.on("error", onError);
  // server.on("listening", onListening);
  console.log("Database created successfully.");
});