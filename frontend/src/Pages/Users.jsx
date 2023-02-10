import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "../API/api"
import { Header } from "../components/Header"


export function Users({user}){   
    const [userInfo,setUserInfo]=useState()
    const navigate = useNavigate()   
    useEffect(()=>{
        async function verifyUser(){
            if(!user){
                navigate("/login")
            }else{
                const info = await API.users.readById(user.id,user.token)
                setUserInfo(info)
            }
        }
        
        verifyUser()},[])

    return(
        <div>
            <Header user={userInfo} />
            <h1>Bem vindo Brasil </h1>

            {/* <h1>Seja bem vindo {userInfo.name}</h1> */}
        </div>

    )
}