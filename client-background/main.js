'use strict';

var server = 'http://invadersjs.com:8080';
var socket;


function activate()
{
    var socket = io(server);
    socket.on('message', onSocketMessage);
}

function onSocketMessage(message)
{
    if (message.hasOwnProperty('color')) {
        var color = message.color;
        console.log('color: ' + color);
        window.document.body.style.backgroundColor = '#' + color;
    }
}

window.addEventListener('DOMContentLoaded', activate);