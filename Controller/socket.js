'use strict';

const socketio = require('socket.io');
//While I have been searching for different alternatives to emit or broadcast with socket.io, the solution is quite simple. Use global variable to access it.
module.exports.listen = (server, ServerEvent) => {
	const io = socketio(server);

    //https://www.youtube.com/watch?v=2DToPMpCPHc
	  //https://socket.io/docs/

	// Ouverture de la socket
  io.on('connection', function(socket){
    console.log('Connexion à Socket.io');
  });
  
};