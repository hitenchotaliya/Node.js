const http = require('http');

const PORT = 3000; 

const server = http.createServer((req, res) => {
  
  res.setHeader('Content-Type', 'text/plain');

 
  if (req.url === '/') {
    res.end('Hello, this is the homepage!');
  } else if (req.url === '/about') {
    res.end('This is the about page.');
  } else {
    res.statusCode = 404;
    res.end('Page not found.');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
