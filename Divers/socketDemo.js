'use strict';

const http = require('http');
const io = require ('socket.io') // pas de path car paquet de dev

const port = process.env.PORT || 3000 // je prend la premire valeur si elle n'est pas définit je prend la deuxième 


io.connect(port, (socket) => {
    socket.on('TEST', () => {
        console.log('YATA');
    })
});

const clientSocket = require('./node_modules/socket.io-client');

clientSocket.on('connect', () => {
    clientSocket.emit('TEST'); 
});

// http.listen();