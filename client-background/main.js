'use strict';

var server = 'https://showpad-team-gripper.herokuapp.com';
var socket;

var actionToColorMap = {
    //up      : '0000FF', // blue
    up      : '000000', // blue
    //down    : 'FF0000', // red
    down    : 'FFFFFF', // red
    //left    : '00FF00', // green
    left    : '888888', // green
    right   : 'FFFF00', // yellow
    dance   : 'FF00FF'  // pink-ish
}


function activate()
{
    var socket = io(server);
    socket.on('message', onSocketMessage);
}

function onSocketMessage(message)
{
    if (message.hasOwnProperty('action')) {
        var action = message.action;
        var color = actionToColorMap[action];
        console.log('color: ' + color);
        window.document.body.style.backgroundColor = '#' + color;
    }
}

window.addEventListener('DOMContentLoaded', activate);