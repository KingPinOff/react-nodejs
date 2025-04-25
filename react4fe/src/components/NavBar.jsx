import "../css/Header.css"
import { useUser } from "../context/userContext"
export default function NavBar(){
    const { roomcode } = useUser();
        return (<>
    <div className="header">
        <div className="roomid">
            
            <h1>Your room code : {roomcode}</h1>

        </div>
    </div>
    </>)
}