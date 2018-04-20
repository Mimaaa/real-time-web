'use strict';

const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', home);

const users = [];
const connections = [];

io.on('connection', socket => {
  connections.push(socket);
  console.log('Somone has connected: %s sockets connected', connections.length);

  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log('Someone has disconnected: %s sockets connected', connections.length);
  });

  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('new user', (data, callback) => {
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });
});

function updateUsernames() {
  io.sockets.emit('get users', users);
}

function home(req, res) {
  res.render('home');
}

http.listen(process.env.PORT || 1902);
