import QrScanner from '/js/qr-scanner.min.js';
QrScanner.WORKER_PATH = '/js/qr-scanner-worker.min.js';
let socket = io();
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
    function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
    }

    if (hasGetUserMedia()) {
        document.getElementById('scan').addEventListener('click',()=>{
            
            document.getElementById('scanner').style.display = 'block';
            const constraints = {
                video: { facingMode: { exact: "environment" } }
            };
     
            let video = document.querySelector('video');
            navigator.mediaDevices.getUserMedia(constraints).
            then((stream) => {video.srcObject = stream});
            let scanner = new QrScanner(video, result => {
                let roomNum = Number(result);
                socket.emit('room',roomNum);
                sessionStorage.setItem('roomName', roomNum);
                setTimeout(function(){document.location.href = "/game"},0);
                socket.emit('phoneConnected',roomNum);
                scanner.destroy();
                scanner = null;
            });
            scanner.start();
        });
    } else {
        alert('gameEasy is not supported by your browser');
    }
    
}