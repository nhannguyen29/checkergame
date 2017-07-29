import Express from 'express';
import path from 'path';
import http from 'http';
import socket_io from 'socket.io';

const app = new Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

/* Socket.io Communication */
const io = socket_io.listen(server);
import socketResolve from './socket.js';

io.on('connection', socketResolve);

//var socket = require('./public/socket/socket.js');
//io.sockets.on('connection', socket);

app.get('/', (req, res) => {
   res.render('index');
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

server.listen(port, err => {
   console.log("Server is listening on port", port);
});
