'use strict';

const socketio = require('socket.io');

module.exports.listen = (server, ServerEvent, colors) => {
	const io = socketio(server);
	
	ServerEvent.on('myEventDone', (data, socket) => {
		socket.emit('myEventDone', data);
	});
	
	// Ouverture de la socket
  io.sockets.on('connection', (socket) => {
	  
	  console.log('Client Connecté');
	  
	  socket.on('myEvent', (data) => {
			ServerEvent.emit('myEvent', data, socket);
			console.log('Emit: myEvent');
		});
  });
};