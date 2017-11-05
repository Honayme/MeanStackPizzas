'use strict';

// REQUIRE
const path       = require('path'),
      express    = require('express'),
      app        = express(),
      http       = require('http').Server(app), // import http module to nodeJs and for this we use express server
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser'),
      io         = require('socket.io')(http),//SocketIo et express partage le même serveur HTTP
      port       = process.env.PORT || 3000,
      myUri      = process.env.URI  || 'mongodb://honayme-meanstackpizzasfactory-5551169';
      

// Mongoose
mongoose.connect(myUri, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }else{
    console.log('Connexion à Mongoose');
    }
});

// Server Event
const ServerEvent = require('./Controller/ServerEvent');

// Socket.io
require('./Controller/socket').listen(http, ServerEvent);

// General Conf
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Template Js for display data 
//ejs bind html to javascript 
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/View', 'index.ejs'));
app.set('views', path.join(__dirname, 'views'))
//Allow to find in our files structure the front file, in our case '.ejs' files
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));

// Require Controller
const Pizza = require ('./Controller/pizzaController');
const Ingredient = require ('./Controller/ingredientController');

// Conf Events Managements
// Pizza.pizzaEvent(ServerEvent);


// Conf Routes
app.use('/pizza', Pizza); //Chemin par défaut /pizza
app.use('/ingredient', Ingredient); //Chemin par défaut /pizza
app.use(express.static('views')); //Static middleware serving files from the VIEW folder


//Allow our app to listen for incoming request on the port assigned above
//We use http server listening because it's connected too our socket io
http.listen(port, () =>{ 
    console.log(`Listen on port ${port}`);
});
