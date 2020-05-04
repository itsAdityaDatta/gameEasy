const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const socketio = require('socket.io');

let port = process.env.PORT;                            // Heroku
if(port == null || port == ""){
    port = 3000;
}

const app = express();
const expressServer = app.listen(port, function(){
    console.log('listening on port', port);
});

const io = socketio(expressServer);
app.use(bodyParser.urlencoded({extended:true}));        // bodyParser
app.use(express.static('public'));                      // express.static
app.set('view engine','ejs');                           // ejs

app.get("/",function(req,res){
    res.render('home',{
    });
});

app.get("/game",function(req,res){
    res.render('game',{
    });
});

io.on('connection', (socket) => {
    console.log(socket.id + 'connected');

    socket.on('disconnect', () => {
        console.log(socket.id + 'disconnected');
    });

    socket.on('phoneConnected',(roomName)=>{
        io.to(roomName).emit('joinRoom');
    });

    socket.on('room',(roomName)=>{
        socket.join(roomName);
    });

    socket.on('alpha',(alpha,roomName)=>{
        socket.broadcast.to(roomName).emit('alpha',alpha);
    }); 
});
