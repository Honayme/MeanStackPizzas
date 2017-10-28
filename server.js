'use strict';

// REQUIRE
const path       = require('path'),
      express    = require('express'),
      app        = express(),
      http       = require('http').createServer(app),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser'),
      io         = require('socket.io')(http),//SocketIo et express partage le même serveur HTTP
      port = process.env.PORT || 3000,
      myUri = process.env.URI || 'mongodb://honayme-meanstackpizzasfactory-5551169';
      

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
app.use(express.static(path.join(__dirname, 'View')));
app.use(express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));

// Require Controller
const Pizza = require ('./Controller/pizzaController');

// Conf Events Managements
// Pizza.pizzaEvent(ServerEvent);

// Conf Routes
app.use('/pizza', Pizza); //Chemin par défaut /pizza
app.use(express.static('VIEW')); //Static middleware serving files from the VIEW folder
app.listen(port, () =>{
    console.log(`Listen on port ${port}`);
});


//SocketIOSandBOX//

io.on('connection', (client) => {
  console.log('Client connected ..');
  
  client.emit('message', {hello: 'world'}); // Emit the 'message' event on the client (browser)
});

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/View', 'index.html')
});