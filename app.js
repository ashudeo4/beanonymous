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
    res.render('index');
});

names=[];
io.sockets.on('connection', function (socket) {
 
    console.log('A user connected');
    
    socket.on('disconnect', function () {
      if(!socket.name) return;
      names.splice(names.indexOf(socket.name),1);
        console.log('A user disconnected');

    });
    socket.on('sendname',(data,callback)=>{
        console.log(data);
        if(names.indexOf(data)!= -1){
            callback(false);
        }else{
        callback(true);
        socket.name=data;
        names.push(socket.name);
        io.sockets.emit('fusername',data);
        console.log(names);
        }
    });
    
    
    socket.on('send message',(data)=>{
        console.log(data);
        
        io.sockets.emit('new message',{msg:data});
    })
});
server.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});