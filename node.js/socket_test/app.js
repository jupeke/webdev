const express = require('express');
var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.emit('message_from_server', 'Salut, mon petit client!');

    socket.on('join', function(data){
      console.log(data);
    })

    socket.on('messages', function(data){
      socket.emit('message_from_server', data);
    })
});

server.listen(8082);
