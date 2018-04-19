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

io.on('connection', function(socket) {
  console.log('Made socket connection', socket.id)

  socket.on('chat', function(data) {
    io.sockets.emit('chat', data)
  })

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data)
  })
})

function home(req, res) {
  res.render('home')
}

http.listen(1902);
