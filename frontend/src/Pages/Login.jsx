import {Link, useNavigate} from "react-router-dom"
import "./form.css"
import { API } from "../API/api"
import { useEffect, useState } from "react"


export function Login(){
    const [user,setUser] = useState()
    const [pass,setPass] = useState()
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem("user"))
    // async function getUser(){
    //     const info = await API.users.readById(userInfo.id,userInfo.token)
    // }

    useEffect(()=>{

        // if(userInfo.token!=null||userInfo.token!=""||!userInfo){
        //     navigate(`/user/${userInfo.id}`)
        // }else{
        //     navigate("/login")
        // }
    })
    async function conectUser(event){
        event.preventDefault()
        function ValidarEmail (email) {
            var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
             return emailPattern.test(email); 
          }
        const payload ={
            email:user,
            password:pass
        }
        if(ValidarEmail(payload.email)){
            const request = await API.users.conectUrl(payload)
            const data = await request.json()

            const user = {
                email:data.email,
                token:data.token,
                id:data.id,
                name:data.name
            }
            if(request.status==200){
                alert(data.message)
                localStorage.setItem("user",JSON.stringify(user))
                navigate("/User/"+user.id)
                window.location.href = window.location.href
            }else{
                alert(data.message)
            }
        }else{
            alert("Favor inserir um email valido!")
        }
    }
    return(
        <div className="containerLogin">
            <div className="contentLogin">
        <form onSubmit={conectUser}>
            <label htmlFor="userName">Email</label>
            <input type="email" id="userName" onChange={e=>setUser(e.target.value)}/>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" onChange={(e)=>setPass(e.target.value)}/>
            <button className="loginButton">Login</button>
        </form>
        <p>Ainda não tem cadastro? <Link to="/register">Clique Aqui!</Link></p>
        </div>
        </div>
   )
}