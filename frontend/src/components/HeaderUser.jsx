import React, { useEffect, useState } from 'react';

import { Link,useNavigate} from "react-router-dom"
import userImage from "../assets/USER.jpg"
import "./Header.css"
import { API } from '../API/api';



export function HeaderUser(props){
    
    const [header,setHeader]=useState()
    const [flag,setFlag]=useState(false)
    const navigate = useNavigate()
    console.log(props)
    
    async function handleHeader(){
        // const request = await API.users.readById(props.id,props.token)
        // const data = await request.json()
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
                <Link to="/"><p>Logo</p></Link>
                <div className="contentInfoUser">
                <p></p>
                    <div className='dropdownLogout'>
                    <div>
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
