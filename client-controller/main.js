'use strict';

var server = 'http://invadersjs.com:8080';
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
            var action = event.target.getAttribute('data-action');
            sendAction(action);
        }
    }

    document.addEventListener('click', onDocumentClick);
}

function sendAction(action)
{
    console.log('send action', action);
    socket.emit('message', { action: action });
}

window.addEventListener('DOMContentLoaded', activate);