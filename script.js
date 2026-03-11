const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.end("Error loading file");
                return;
            }
            // 1. Tell the browser it is HTML
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // 2. Write the data and end inside the callback
            res.end(data); 
        });
    }
});

server.listen(3000, 'localhost');