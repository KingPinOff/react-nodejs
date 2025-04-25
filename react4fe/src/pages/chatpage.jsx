
import NavBar from "../components/NavBar"
import ChatLayout from "../components/Chats"
import InputForm from "../components/MsgInputform"

export default function ChatPage(){
    return (
        <>
        <NavBar />
        <section id="chatwindow">

        <ChatLayout />
        </section>
        <InputForm />

        </>
    )
}