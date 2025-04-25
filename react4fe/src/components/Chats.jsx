import MessageBubble from "./MessageBubble";
import { useUser } from "../context/userContext";
import { useEffect, useRef } from "react";
import socket from "../socket/socket";
// import { useUser } from "../context/userContext";

export default function ChatLayout() {
  const {setTypingUser}= useUser()
  useEffect(() => {
    socket.connect();
    socket.on("display-typing", ({ username }) => {
      setTypingUser(username);
      // console.log("popo");
      setTimeout(() => setTypingUser(null), 2000);
    });
  
    return () => {
      socket.off("display-typing");
    };
  }, []);
  
  

const messagesEndRef = useRef(null);
const { message,typingUser} = useUser();

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

};
useEffect(() => {
  scrollToBottom();
}, [message]); 

  return (
    <div>
      {message.map((msg, index) => (
        <MessageBubble
          key={index}
          type={msg.type}
          content={msg.content}
          from={msg.from}
        />
      ))}
{typingUser && <div className="chatLayout recieved">
        <div className="typing">{typingUser} is typing...</div>

      </div>}
      <div ref={messagesEndRef} />
    </div>
  );
}
