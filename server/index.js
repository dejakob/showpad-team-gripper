var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var listeners = [];

app.use(express.static('test'));
app.use(express.static('bower_components'));

io.on('connection', function(socket) {
    var d = require('domain').create();

    d.on('error', function(err) {
        console.log('UNCAUGHT ERROR', err);
    });

    d.run(function() {
        socket.on('message', function(data) {
            listeners.forEach(function (listener) {
                listener('message', data);
            });
        });

        listeners.push(function (cmd, data) {
            socket.emit(cmd, data);
        });
    });
});

http.listen(8080);