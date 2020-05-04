let socket = io();

document.addEventListener("DOMContentLoaded", function(event) {
    if(sessionStorage.getItem('roomName') == "" || sessionStorage.getItem('roomName') == null){
        window.location.href = "/";
    }
    else{
        let roomName = sessionStorage.getItem('roomName');
        socket.emit('room',roomName);
        document.getElementById('title').innerHTML = 'Room ID: ' + roomName;

        //_______________________________________ CONFIGURING THE WHEEL ___________________________

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            window.addEventListener("deviceorientation", handleOrientation, true);
            function handleOrientation(event){
                let alpha = event.alpha;
                socket.emit('alpha',alpha,sessionStorage.getItem('roomName'));
            }
        }
        else{
            document.getElementById('wheel').style.display = 'inline-block';
            var w = window.innerWidth;
            let ans = w/2 - 200;
            document.getElementById('wheel').style.left = ans + 'px';
        }
    }
});

function wheelPos(){
    var w = window.innerWidth;
    let ans = w/2 - 200;
    document.getElementById('wheel').style.left = ans + 'px';
}

socket.on('alpha',(x)=>{
    document.getElementById('wheel').style.transform = 'rotateZ('+ -x + 'deg)';
});