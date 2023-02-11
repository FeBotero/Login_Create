import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "../API/api"


const info = localStorage.getItem("user")
export function Users(){   
    const user = JSON.parse(info)
    const [userInfo,setUserInfo]=useState()
    const navigate = useNavigate()   
    async function verifyUser(){
        if(user){
            const request = await API.users.readById(user.id,user.token)
            const data = await request.json()
            setUserInfo(data)
        }else{
            navigate("/login")
        }
    }
    
    useEffect(()=>{
        verifyUser()},[])
        
        console.log(userInfo)
    return(
        <div>

            <h1>Bem vindo Brasil </h1>
            <p>{userInfo==undefined||userInfo==null?"":userInfo.name}</p>
            <p>{userInfo==undefined||userInfo==null?"":userInfo.email}</p>
            
        </div>

    )
}