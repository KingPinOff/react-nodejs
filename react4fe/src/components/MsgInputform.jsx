import { useState } from "react";
import right_arrow from "../assets/send.png";
import socket from "../socket/socket";
import { useUser } from "../context/userContext";
export default function InputForm() {

  const [input,setInput] = useState('')
  const {username,roomcode,setMessage} = useUser()
  const handleTyping = ()=>
  {
    socket.emit("typing",{username:username,roomcode:roomcode})
    
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const trimmed = input.trim();
    if (!trimmed) return
    socket.emit("send-message", {
      content: trimmed,
      from: username,
      room: roomcode,
    });
    // console.log(roomcode, " it is where it is sent");
    

    // Update local state
    setMessage((prev) => [
      ...prev,
      { type: "sent", content: trimmed, from: username },
    ]);

    setInput("");



  }
  return (
    <form
      onSubmit={handleSubmit}
      action="#"
      id="inputsection"
      className="inputsection"
      autoComplete="off"
    >
      <input type="text" id="myMsg" value = {input} onChange={(e)=>{setInput(e.target.value)
      handleTyping();}

      } placeholder="type your message"></input>
      <button type="submit" id="sendBtn">
        <img className="arrow" src={right_arrow} alt="send"></img>
      </button>
    </form>
  );
}
