
const http = require('http');
const app = require('./app');
require('dotenv').config();

const port = process.env.A_PORT || 4000;

const server = http.createServer(app);

server.listen(port, function () {
    console.log('Server listening on port ' + port);
});