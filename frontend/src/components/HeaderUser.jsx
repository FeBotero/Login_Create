import React, { useEffect, useState } from 'react';

import { Link,useNavigate} from "react-router-dom"
import userImage from "../assets/USER.jpg"
import "./Header.css"
import logo from "../assets/Solar system-pana.png"



export function HeaderUser({user}){
    
    const [header,setHeader]=useState()
    const [flag,setFlag]=useState(false)
    const navigate = useNavigate()

    
    async function handleHeader(){
     
        setHeader(user)
    }
    function logout(){
        localStorage.removeItem("user")
        navigate("/")
        window.location.href=window.location.href
    }   
    function handleUpdate(){
        setFlag(!flag);
    }
    useEffect(()=>{
        handleHeader()

    },[])
  
    return(
        <div>
            <div className="Header">
                <div className='continerHedar'>
                <Link to="/"><img className='logo' src={logo} alt="" /></Link>
                    <div className="contentHeaderUser">
                    {header==undefined||header==null?"":<p>{header.name}</p>}
                        <div className='dropdownLogout'>
                            <button className="userImage" onClick={handleUpdate}><img  src={userImage} alt="" /></button>
                            <div className={flag===true?"box":"hidden"}>
                                <button onClick={logout}className='buttonLogout'>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )

}


