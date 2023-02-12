import {Link, useNavigate} from "react-router-dom"
import "./form.css"
import { API } from "../API/api"
import { useState } from "react"
import logoPerson from "../assets/logoPerson.png"
import { Envelope,Lock } from "phosphor-react";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from 'react-toastify';

export function Login(){
    const [user,setUser] = useState()
    const [pass,setPass] = useState()
    const navigate = useNavigate()

    function buttonRegister(){
        navigate("/register")
    }

   
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
                
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                localStorage.setItem("user",JSON.stringify(user))
                navigate("/User/"+user.id)
                window.location.href=window.location.href

            }else{
                
                toast.error(data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }else{
            toast.error('Favor inserir um email valido!', {
                position: toast.POSITION.TOP_CENTER
            });
            
        }
    }
    return(
        <div className="containerLogin">
            <div className="contentLogin">
                <div className="contentInfo">
                    <img src={logoPerson} alt="" />
                    <h2>Bem vindo a bordo!</h2>
                    <p>vamos lá?</p>

                </div>
                <div className="contentForm">
                
                <form onSubmit={conectUser}>  
                    
                    <div className="inputView">
                    <Envelope size={32} />
                    <input type="email" id="userName" placeholder=" Email" onChange={e=>setUser(e.target.value)}/>
                    </div>
                    <div className="inputView">
                    <Lock size={32} />
                    <input type="password" id="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>
                    </div>
                        
                    
                    <button className="loginButton">Log in</button>
                </form>
                <p>Ainda não tem cadastro? </p>
                <button onClick={buttonRegister} className="buttonRegister">Registrar</button>
                </div>
               
        
        </div>
        <ToastContainer/>
        </div>
   )
}