'use strict';

var socket;
var server          = 'https://showpad-team-gripper.herokuapp.com';
var sequence        = [];

var timeout         = 200;
var intervalId      = null;

var defaultColor    = '000000';
var color1          = 'FFFFFF';
var color0          = '888888'

var actionToSequenceMap = {
    left    : [color1, color0, color0],
    right   : [color0, color1, color0],
    up      : [color1, color1, color0],
    down    : [color0, color0, color1],
    dance   : [color1, color0, color1]
}

function activate()
{
    intervalId = window.setInterval(playSequence, timeout);
    socket = io(server);
    socket.on('message', onSocketMessage);
}

function onSocketMessage(message)
{
    if (message.hasOwnProperty('action')) {
        var action = message.action;
        var actionSequence = actionToSequenceMap[action];
        console.log('sequence: ' + actionSequence);

        sequence = sequence.concat(actionSequence).concat([defaultColor]);
    }
}

function playSequence()
{
    var color = sequence.shift() || defaultColor;

    window.document.body.style.backgroundColor = '#' + color;
    window.document.body.style.backgroundImage = 'url()';
}

window.addEventListener('DOMContentLoaded', activate);