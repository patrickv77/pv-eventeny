const http = require('http');

const server = http.createServer((req, res) => {
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