let socket = io();
let roomNum = null;

//______________________________________________________________________ Typewriter Effect_________________________________________________________

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #08f}";
    document.body.appendChild(css);

    if (window.DeviceOrientationEvent) {
        document.getElementById('support').style.color = "rgb(0,150,40)";
        document.getElementById("support").innerHTML = "Device Supported";
    }
    else{
        document.getElementById('support').style.color = "#ff0000";
        document.getElementById("support").innerHTML = "Device Not Supported";
    }

    //____________________________________________________ GENERATE QR CODE______________________________________________________________

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 170,
        height : 170
    });

    roomNum = Math.floor(Math.random() * 99999999) + 100000000;

    function makeCode () {
        let roomNumString = String(roomNum);
        qrcode.makeCode(roomNumString);
    }
    makeCode();
    //____________________________________________________ IF DEVICE = PHONE ____________________________________________________________

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        
        document.getElementById('scan').style.display = 'block';
        document.getElementById('support').style.display = 'inline-block';
    }
    else{
        document.getElementById('connect').style.display = 'block';
        document.getElementById('barContainer').style.display = 'block';
        sessionStorage.setItem('roomName', roomNum);
        socket.emit('room',roomNum);
        console.log(roomNum);
    }
}

socket.on('joinRoom',()=>{
    setTimeout(function(){document.location.href = "/game"},0);
});