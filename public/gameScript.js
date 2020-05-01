let socket = io();

document.addEventListener("DOMContentLoaded", function(event) {
    if(sessionStorage.getItem('roomName') == ""){
        window.location.href = "/";
    }
    else{
        let roomName = sessionStorage.getItem('roomName');
        socket.emit('room',roomName);
        document.getElementById('title').innerHTML = 'Room ID: ' + roomName;
    }
});