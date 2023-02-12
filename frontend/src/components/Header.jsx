import React, { useEffect, useState } from 'react';

import { Link,useNavigate} from "react-router-dom"
import logo from "../assets/Solar system-pana.png"
import "./Header.css"



export function Header(){
    
    
    return(
        <div>
           
           <div className="Header">
                <div className='continerHedar'>
                <Link to="/"><img className='logo' src={logo} alt="" /></Link>
                <Link to="/login"><button className="loginHbutton">Login</button></Link>
                </div>
            </div>
        </div>
    )

}
