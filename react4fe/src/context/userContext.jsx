import { useContext,createContext,useState } from "react";
// import { useNavigate } from "react-router-dom";
import io from "socket.io-client"

const socket = io("http://localhost:3000",{
    autoConnect: false,
})

const UserContext = createContext()


export const UserProvider = ({children}) =>
{
    // const navigate = useNavigate()
    // const [username,setUsername] = useState("");
    const [username, setUsername] = useState(() => {
        return prompt("What should we call you? Cancel to remain anonymous ") || "👺";
      });
    const [roomcode,setRoomcode] = useState("");
    const [joined,setJoined] = useState(false);
    const [message,setMessage] = useState([])
    const [typingUser,setTypingUser] = useState(null)

    // useEffect(()=>{
        // socket.connect()
        // socket.on("room-created", (newroomCode) => {
        //     setRoomcode(newroomCode)
        //     setJoined(true)
        //     console.log("we r here");
        //     navigate(`/chat/${newroomCode}`);
        //     setMessage((prev)=>[...prev,{type : "alert",content:`${username} joined the room`}])
            
            
        
        //     socket.to(newroomCode).emit("Joined",{type : "alert",content:`${username} joined the room`})
        // });
        
        
        // socket.on("receive-message", (data) => {
        //     setMessage((prev) => [
        //       ...prev,
        //       { type: "received", content: data.content, from: data.from },
        //     ]);
        //   });
      
        //   socket.on("user-joined", (name) => {
        //     setMessage((prev) => [
        //       ...prev,
        //       { type: "alert", content: `${name} joined the room` },
        //     ]);
        //   });
      
        //   socket.on("user-left", (name) => {
        //     setMessage((prev) => [
        //       ...prev,
        //       { type: "alert", content: `${name} left the room` },
        //     ]);
        //   });
        //   socket.on("chat-history", (history) => {
        //     setMessage(history.map(msg => ({
        //       type: "received",
        //       content: msg.content,
        //       from: msg.from
        //     })));
        //   });
          
      
    //       return () => {
    //         socket.off("receive-message");
    //         socket.off("user-joined");
    //         socket.off("user-left");
    //       };

    // },[])
    return (
        <UserContext.Provider
        value={
            {
                socket,
                username,
                setUsername,
                roomcode,setRoomcode,
                joined,
                setJoined,
                message,
                setMessage,typingUser,setTypingUser
            }
        }
        
        > 
        {children}
          </UserContext.Provider>

    );

}

export const useUser = () => useContext(UserContext)