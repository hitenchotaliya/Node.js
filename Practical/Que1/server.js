const http = require('http');
const fs = require('fs');

const port = 8000;

function serveStaticFile(res, filename, contentType) {
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      
      serveStaticFile(res, './index.html', 'text/html');
    } 
  } 
 
 else if (req.method === 'POST') {
    if (req.url === '/') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, this is a POST request with body: ' + body);
      });
    } else {
     
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } else {

    res.writeHead(101, { 'Content-Type': 'text/plain' });
    res.end('101 Not Implemented');
  }
});


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});