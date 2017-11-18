'use strict';

const socketio = require('socket.io');

module.exports.listen = (server, ServerEvent) => {
	const io = socketio(server);
	
// 	ServerEvent.on('pizzaDeleted', (data, socket) => {
// 		global.io.emit('pizzaDeleted', data);
// 	});
	
	
    ServerEvent.on('pizzaDeleted', (data) => {
        console.log("socket event");
		io.sockets.emit('pizzaDeleted', data);
	});
    //https://www.youtube.com/watch?v=2DToPMpCPHc
	  //https://socket.io/docs/
	  
	//Check serverEvent for send an io.emit when we save a pizza 
	//and try to broadcast this into the multiple open browsers in consol.log
	//https://www.ldlc.com/fiche/PB00119514.html
	
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