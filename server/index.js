import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import cors from "cors"
import { log } from 'console'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express()
app.use(cors());


const server = createServer(app)
// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, '../react4fe/dist')));
console.log(path.join(__dirname, '../react4fe/dist/index.html'))


// For any other route, serve index.html (for React Router)
// Serve static files from the React frontend
// app.use(express.static(path.join(__dirname, '../react4fe/dist')));

// For any other route, serve index.html (for React Router)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../react4fe/dist/index.html'));
}); 
const io = new Server(server,
    {
        cors: {
            origin: "http://localhost:5173",
            methods : ['GET','POST']
        }
    }       
)
const roomMessages ={}

io.on("connection",(socket)=>{
    socket.on("create-room",(roomCode)=>
    {
        // console.log(roomCode);
        socket.join(roomCode);

        // roomMessages[roomCode]=[]
        socket.emit("room-created",roomCode);
        
       
        // console.log("Socket rooms:", socket.rooms);
        
    }) 
    // socket.on('Joined',()=>
    // {
    //     console.log("lala");
        
    // }) 
    socket.on("join-room",(data)=>
    {
        const x = io.sockets.adapter.rooms.get(data.roomcode)
        if(x){
            socket.join(data.roomcode)
            socket.emit("room-joined",data.roomcode)
            // console.log(`Broadcasting joined message in room: ${data.roomcode}`);

            socket.to(data.roomcode).emit("receive-alert",{
                type :"alert",content: `A new user ${data.username}  joined the room`
            })
        }
        else{
            const avail = [...io.sockets.adapter.rooms.keys()]
            socket.emit("room-not-found",{entry :data.roomcode,avail: avail})
        }
    }
    )
    socket.on("send-message",({room,content,from})=>{
        const msg = {from,content}
        // console.log("server send msg" ,msg,room,"hello")
        if((room && room.trim() !== "")){
        socket.to(room).emit("receive-message",msg);}
        else console.error("server send msg room is undefined")
    })
    socket.on("typing", ({ username, roomcode }) => {;
        
        socket.to(roomcode).emit("display-typing", { username});
      });

        socket.on("disconnecting", () => {
            const rooms = [...socket.rooms].filter(r => r !== socket.id);
            rooms.forEach(room => {
              socket.to(room).emit("user-left", socket.id);
            });
            // console.log("here")
    })
    
})


server.listen(3000,()=>{
    console.log("Server running on 3000"
    )
})
