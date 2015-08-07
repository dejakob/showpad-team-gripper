'use strict';

var server = 'http://172.16.2.170:8080';
var socket;
var buttons;

var actionToColorMap = {
    up      : '0000FF', // blue
    down    : 'FF0000', // red
    left    : '00FF00', // green
    right   : 'FFFF00', // yellow
    dance   : 'FF00FF'  // pink-ish
}

function activate()
{
    socket = io(server);
    addClickListener();
}

function addClickListener()
{
    function onDocumentClick (event) {
        if (event.target.className.match(/\baction-button\b/)) {
            var action = event.target.getAttribute('data-action');

            if (actionToColorMap.hasOwnProperty(action)) {
                sendColor(actionToColorMap[action]);
            }
        }
    }

    document.addEventListener('click', onDocumentClick);
}

function sendColor(color)
{
    console.log('send color', color);
    socket.emit('message', { color: color });
}

window.addEventListener('DOMContentLoaded', activate);