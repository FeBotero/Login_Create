import { Link } from "react-router-dom"
import userImage from "../assets/USER.jpg"
import "./Header.css"

export function Header({user}){
    return(
        <div>
            {
                !user?
                <div className="Header">
                <Link to="/"><p>Logo</p></Link>
                <Link to="/login"><button className="loginHbutton">Login</button></Link>
                </div>:
                <div>
                <p>Logo</p>
                <img src={userImage} alt="" />
            </div>
            }
        </div>
    )
}