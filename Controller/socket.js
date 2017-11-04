'use strict';

const socketio = require('socket.io');

module.exports.listen = (server, ServerEvent) => {
	const io = socketio(server);
	
	ServerEvent.on('myEventDone', (data, socket) => {
		socket.emit('myEventDone', data);
	});
	
	// Ouverture de la socket
io.on('connection', function(socket){
  console.log('Connexion à Socket.io');
  
  socket.emit('jeSuisCo', {message : 'Hello'});
  
    socket.on('OtherEvent', function (data) {
    console.log(data.message);
  });
});
  
  
  

  // Créer une connexion permanente avec le serveur http
  // Utiliser les evenements pour savoir quand un changement/message a été effectué/envoyé
  // Boradcast cet update pour que tous les clients voient le changement
  // Faire persister les données pour qu'elles apparaissent à la prochaine connexion
};