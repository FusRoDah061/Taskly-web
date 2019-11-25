let express = require('express'); 
let consign = require('consign');
let body_parser = require('body-parser');
let device = require('express-device');

let app = express(); 

app.set('view engine', 'ejs'); 
app.set('views', './app/views');
app.use(express.static('./app/public'));
app.use(device.capture());

app.use(body_parser.urlencoded({ extended: true }));

consign()
.include('./app/routes')
.then('./config/dbConnection.js')
// Models
.then('./app/models/tarefaModel.js')
// Controllers
.then('./app/controllers/homeController.js')
.into(app);

if(app.app) {
  app.routes = app.app.routes;
  app.models = app.app.models;
  app.controllers = app.app.controllers;
  app.app = undefined;
}

module.exports = app;
