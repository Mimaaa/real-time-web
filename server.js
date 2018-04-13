'use strict';

const express = require('express');

express()
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', home)
  .listen(1902);

function home(req, res) {
  res.render('home')
}
