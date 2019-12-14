let express = require('express'); 
let consign = require('consign');
let body_parser = require('body-parser');
let device = require('express-device');
let expressValidator = require('express-validator');
let expressSession = require('express-session');
let crypto = require('crypto');

let app = express(); 

app.set('view engine', 'ejs'); 
app.set('views', './app/views');
app.use(express.static('./app/public'));
app.use(device.capture());
// app.use(crypto());

app.use(body_parser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(body_parser.json());
app.use(expressSession({
  secret: 'ViscondedeSabugosa', //Segredo que pode ser qq um
  resave: false, //Regrava do lado do servidor toda vez
  saveUninitialized: false //cria uma sessão nova toda vez
}));

consign()
.include('./app/routes')
.then('./config/dbConnection.js')
.then('./config/emailSender.js')
.then('./app/models')
.then('./app/controllers')
.into(app);

if(app.app) {
  app.routes = app.app.routes;
  app.models = app.app.models;
  app.controllers = app.app.controllers;
  app.app = undefined;
}

module.exports = app;
