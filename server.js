'use strict';

// REQUIRE
const path       = require('path'),
      express    = require('express'),
      app        = express(),
      http       = require('http').Server(app),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser');

// INIT
const port = process.env.PORT || 3000;
let catNames = [];

// Mongoose
mongoose.connect('mongodb://localhost/pizza4ever', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

// Server Event
const ServerEvent = require('./Controller/ServerEvent');

// Socket.io
require('./Controller/socket').listen(http, ServerEvent);

// General Conf
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'View')));
app.use(express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));

// Require Controller
const Pizza = require ('./Controller/pizzaController');

// Conf Events Managements
Pizza.pizzaEvent(ServerEvent);

// Conf Routes
app.use('/pizza', Pizza.router);