import React, { useEffect, useState } from 'react';

import { Link,useNavigate} from "react-router-dom"
import userImage from "../assets/USER.jpg"
import "./Header.css"



export function Header(props){
    
    
    return(
        <div>
           
           <div className="Header">
                <Link to="/"><p>Logo</p></Link>
                <Link to="/login"><button className="loginHbutton">Login</button></Link>
                </div>
           
        </div>
    )

}
