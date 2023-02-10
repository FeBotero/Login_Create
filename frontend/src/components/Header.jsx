import React, { useEffect, useState } from 'react';

import { Link,useNavigate} from "react-router-dom"
import userImage from "../assets/USER.jpg"
import "./Header.css"



export function Header({user,refreshUser}){
    const userInfo = user
    const [header,setHeader]=useState()
    const [flag,setFlag]=useState(true)
    const navigate = useNavigate()
    

    function logout(){
        localStorage.removeItem("user")
        navigate("/")
        refreshUser()
    }   

    function showHeader(){
        setHeader(userInfo)
        
    }
    
    function handleUpdate(){
        setFlag(!flag);
    }
    useEffect(()=>{
        showHeader()
    },[])

    return(
        <div>
            { 
                header==null ?
                <div className="Header">
                <Link to="/"><p>Logo</p></Link>
                <Link to="/login"><button className="loginHbutton">Login</button></Link>
                </div>:
                <div className="Header">
                <Link to="/"><p>Logo</p></Link>
                <div className="contentInfoUser">
                <p>{header.name}</p>
                    <div className='dropdownLogout'>
                    <div>
                <button onClick={handleUpdate}><img className="userImage" src={userImage} alt="" /></button>
                <div className={flag===true?"box":"hidden"}>
                    <button onClick={logout}className='buttonLogout'>Logout</button>
                </div>
            </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}


// box ${flag === false ? "" : "hidden"}