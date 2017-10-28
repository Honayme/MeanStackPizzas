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
  
  //Créer une connexion permanente avec le serveur http
  //Utiliser les evenements pour savoir quand un changement/message a été effectué/envoyé
  //Boradcast cet update pour que tous les clients voient le changement
  //Faire persister les données pour qu'elles apparaissent à la prochaine connexion
};