const app=require("express")();
const server=require("http").createServer(app);
const cors=require("cors");
const { Socket } = require("socket.io");

const io=require("socket.io")(server,{
    cors:{
        origin:"*",
        method:["GET","POST"]
    }
});

app.use(cors());

const PORT=process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Server is running");
});

io.on("connection",(socket)=>{
    socket.emit('me',socket.id);

    socket.on("disconnect",()=>{
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser",({userToCall, signalData,from,name})=>{
        io.to(userToCall).emit("callUser",{signal:signalData,from,name});
    });
    
    socket.on('cameraStatus', (data) => {
        // Broadcast the camera status to other users
        socket.broadcast.emit('cameraStatus', { userId: socket.id, status: data.status });
      });
      
    socket.on("answerCall",(data)=>{
        io.to(data.to).emit("callAccepted",data.signal);
    })
});
    

server.listen(PORT,()=>{ console.log(`Server is listening on port ${PORT}`); });