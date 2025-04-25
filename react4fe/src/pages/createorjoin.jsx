import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import { useUser } from "../context/userContext";
import "../css/createorjoin.css";
import { useEffect} from "react";
export default function CreateorJoin() {
    const{setTypingUser,username,setMessage,roomcode,setRoomcode,setJoined} = useUser()
    

    const navigate = useNavigate();   
  useEffect(() => {
    socket.connect(); 
    socket.on("room-created", (newroomCode) => {
      setRoomcode(newroomCode)
      setJoined(true)
      navigate(`/chat/${newroomCode}`);
      setMessage((prev)=>[...prev,{type : "alert",content:`${username} joined the room`}])
      // socket.emit("Joined",{type : "alert",content:`${username} joined the room`})
      
  });
    socket.on("user-left",()=>
    {
      console.log("dis");
      
      setJoined(false)
      setRoomcode(null)
      setMessage((prev)=>[...prev,{type : "alert",content:`A user left the room`}])
    })

    socket.on("room-joined",(roomcode)=>{
        setRoomcode(roomcode);
        setJoined(true);
        navigate(`/chat/${roomcode}`)
        // setMessage((prev)=>[...prev,{type : "alert",content:`${username} joined the room`}]) 
    })
    socket.on("receive-alert", (data) => {
      setMessage((prev) => [
        ...prev,
        { type: "alert", content: data.content, from: data.from },
      ]);
      // console.log("count");
      
      
    });
    socket.on("receive-message", (data) => {
      setMessage((prev) => [
        ...prev,
        { type: "receive", content: data.content, from: data.from },
      ]);
      console.log("count");
      
      
    });

    socket.on("room-not-found",()=>{
        alert(`Room doesnt exist.Please check the code again`)});
    socket.on("display-typing", ({ username }) => {
    setTypingUser(username);
    // console.log("popo");
    
    setTimeout(() => setTypingUser(null), 2000); // Clear after 2s
    });

    return () => {socket.off("room-created")
      socket.off("display-typing");
  }}
  , []);


  function handleCreateroom() {
    const newCode = generateRoomCode();
    socket.emit("create-room",newCode);
    setRoomcode(newCode)
    navigate(`/chat/${newCode}`)
    // console.log("Room created",newCode);
    setMessage((prev)=>[...prev,{type:"alert",content:"You created the room"}])
    
  }
  function generateRoomCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  const handleJoinRoom =(e) =>{
    e.preventDefault();
    if (roomcode.length===5){
        socket.emit("join-room",{roomcode,username})
    }
    else{
        alert("Please enter a valid 5 digit code")
    }
  };

  return (

      <div className="join-create-container">
          <form onSubmit={handleJoinRoom} action="#">
            <p>Welcome!!!</p>
            <p>If you have a code enter and join</p>
            <p>or you can create one!</p>
            <input
            className="input-roomcode"
              maxLength={5}
              type="text"
              value={roomcode || ""}
              onChange={(e) => setRoomcode(e.target.value.toUpperCase())}
              name="roomid"
              placeholder="Enter your room code"
              autoComplete="off"
            />
            <br />
            <div className="btn-container">
            <button className="join-btn" type="submit">
              JOIN
            </button>
          <button className="create-btn" onClick={handleCreateroom}>
            CREATE ROOM
          </button>

            </div>
          </form>
        </div>
  );
}
