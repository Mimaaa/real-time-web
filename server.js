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

function home(req, res) {
  res.render('home')
}

http.listen(1902);
