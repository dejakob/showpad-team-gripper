'use strict';

var server = 'http://172.16.2.170:8080';
var socket;
var buttons;

function activate()
{
    socket = io(server);
    addClickListener();
}

function addClickListener()
{
    function onDocumentClick (event) {
        if (event.target.className.match(/\baction-button\b/)) {
            sendColor(event.target.getAttribute('data-color'));
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