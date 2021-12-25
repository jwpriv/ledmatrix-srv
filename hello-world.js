var http = require('http');
const matrix = require('rpi-led-matrix');

var server = http.createServer(function (request, response) { response.writeHead(200, { "Content-Type": "text/plain" });
response.end("Hello World\n"); });



server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");
