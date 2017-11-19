'use strict';
 /**
 * @file server.js
 * @desc The PizzaMafiosi's entry point App.<br />
 * <br />
 * 
 * Pizza Mafiosi is an app created by the Italian mafia in order to 
 * administrate the pizza company allow them to launder money.<br />
 * <br />
 * 
 * Date de Création 20/10/2017 <br />
 * Date de modification 19/11/2017 <br />
 * 
 * @version Alpha 1.0.0
 * 
 * @author Thomas Mirabile            <thomas.mirabile@ynov.com>
 * 
 */
 
// REQUIRE
const path       = require('path'),
      express    = require('express'),
      app        = express(),
      http       = require('http').Server(app), // import http module to nodeJs and for this we use express server
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser'),
      io         = require('socket.io')(http),//SocketIo et express partage le même serveur HTTP
      port       = (process.env.NODE_ENV === "test") ? 3001 : process.env.PORT || 3000,
      myUri      = (process.env.NODE_ENV === "test") ? 'mongodb://127.0.0.1/pizzaTest' : 'mongodb://127.0.0.1/pizza';
      

// Mongoose
mongoose.connect(myUri, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }else{
    console.log('Connexion à Mongoose');
    }
});

// Require Controller
const ServerEvent = require('./Controller/ServerEvent');
const Pizza = require ('./Controller/pizzaController');
const Ingredient = require ('./Controller/ingredientController');


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


// Conf Routes
app.use('/pizza', Pizza); //Chemin par défaut /pizza
app.use('/ingredient', Ingredient); //Chemin par défaut /pizza
app.use(express.static('views')); //Static middleware serving files from the VIEW folder


//Allow our app to listen for incoming request on the port assigned above
//We use http server listening because it's connected too our socket io
http.listen(port, () =>{ 
    console.log(`Listen on port ${port}`);
});

//While I have been searching for different alternatives to emit or broadcast with socket.io, the solution is quite simple.
//Use global variable to access it.
global.io = io; 

  io.on('connection', function(socket){
    console.log('Connexion à Socket.io');
  });
  

module.exports = http;