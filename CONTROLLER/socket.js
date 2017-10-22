'use strict';

// TODO: Make Doc

const socketio = require('socket.io');

module.exports.listen = (server, ServerEvent, colors) => {
	const io = socketio(server);
	
	console.log('Socket ready');
	
	ServerEvent.on('myEventDone', (data, socket) => {
		socket.emit('myEventDone', data);
	});
	
	// Broadcast NewPizza for all users
	ServerEvent.on('PizzaSaved', (data) => {
		io.sockets.emit('NewPizza', data);
	});
	
	// TODO: Create the Update ingredient Event & Socket
	// TODO: Create the Remove ingredient Event & Socket
	// TODO: Create the Update pizza Event & Socket
	// TODO: Create the Remove pizza Event & Socket
	
	// On Open Socket
  io.sockets.on('connection', (socket) => {
		console.log(`Client Connecté: ${socket.id}`);
		
		socket.on('myEvent', (data) => {
			ServerEvent.emit('myEvent', data, socket);
			console.log('Emit: myEvent');
		});
  });
};