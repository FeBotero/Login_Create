import { Link } from "react-router-dom"
import userImage from "../assets/USER.jpg"
import "./Header.css"
import { API } from "../API/api"
import { useEffect, useState } from "react"


const user = localStorage.getItem("user")
const userLog = JSON.parse(user)

export function Header(){
    const [user,setUser]=useState()

    async function getUser(){
        const userInfo = await API.users.readById(userLog.id,userLog.token)
        setUser(userInfo)
    }
    useEffect(()=>getUser(),[])
    
console.log(user)
    return(
        <div>
            {
                
                user==undefined ?
                <div className="Header">
                <Link to="/"><p>Logo</p></Link>
                <Link to="/login"><button className="loginHbutton">Login</button></Link>
                </div>:
                <div>
                <p>Logo</p>
                <div>
                {/* <p>{user.name}</p> */}
                <img src={userImage} alt="" />
                </div>
            </div>
            }
        </div>
    )
}