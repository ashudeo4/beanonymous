const express=require("express");
const app=express();
const ejs=require('ejs');
const path=require('path');
const mongoose=require("mongoose");
var server = require('http').Server(app);
let io=require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
const port=process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.render("index");
});
// let clients=0;
let roomno=1;
//Whenever someone connects this gets executed
io.on('connection', function (socket) {
    // clien    ts++;
    console.log('A user connected');
    // socket.emit('newuser',{dess:'hey welcome'})
    // socket.broadcast.emit('newuser',{dess:clients+' clients connecteds'})
    //Whenever someone disconnects this piece of code executed
    // setTimeout(()=>{
    //     socket.emit('messagesend',{des:"bla bla bla"});
    // },5000);
    // socket.on('disconnect', function () {
    //     clients--;
    //     socket.broadcast.emit('newuser',{dess:clients+' clients connected'})
    //     console.log('A user disconnected');
    // });
    // socket.on('key',(data)=>{
    //     console.log(data);
        
    // });
    if(io.adapter.rooms["room-"+roomno]&& io.adapter.rooms["room-"+roomno].length>1)
    roomno++;
    socket.join('room-'+roomno);

    io.sockets.in('room-'+roomno).emit('connectToRoom','You are in room number '+roomno);
});
server.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});