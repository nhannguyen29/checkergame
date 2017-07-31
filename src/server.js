import Express from 'express';
import path from 'path';
import http from 'http';
import socket_io from 'socket.io';
import socketRoute from './socket.js';

var app = new Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(Express.static(path.join(__dirname, 'public')));

var server = http.Server(app);
var io = socket_io.listen(server);
io.on('connection', socketRoute);

app.get('/', (req, res) => {
   res.render('index');
});

var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';

server.listen(port, err => {
   console.log("Server is listening on port", port);
});
