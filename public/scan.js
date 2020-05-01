import QrScanner from '/js/qr-scanner.min.js';
QrScanner.WORKER_PATH = '/js/qr-scanner-worker.min.js';
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
                alert(result);
                scanner.destroy();
                scanner = null;
            });
            scanner.start();
        });
    } else {
        alert('gameEasy is not supported by your browser');
    }
    
}