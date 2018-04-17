'use strict';

const express =require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http)

app
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', home)

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', socket =>  {
  socket.on('chat message', msg => {
    console.log('message: ' + msg);
  });
});

io.on('connection', socket =>  {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

function home(req, res) {
  res.render('home')
}

http.listen(1902);
