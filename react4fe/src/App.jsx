// import { useState } from "react";
// import bg_img from "./assets/bg-chat.jpg";
import NavBar from "./components/NavBar";
import ChatPage from "./pages/chatpage";
import { Routes, Route } from "react-router-dom";
import CreateorJoin from "./pages/createorjoin";
// import { useUser } from "./context/userContext";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import ChatLayout from "./components/Chats";
import "./App.css";
// import { useEffect } from "react";

function App() {
  // const { setUsername } = useUser();
  // const [prompted, setPrompted] = useState(false);
  // useEffect(() => {
  //   if(!prompted){
  //   const newUser = prompt("What should we call you? Cancel to remain anonymous ") || "👺";
  //   setUsername(newUser);
  //   setPrompted(true)
  //   }
  // }, [prompted,setUsername]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateorJoin />}></Route>
        <Route path="/chat/:roomcode" element={<ChatPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
