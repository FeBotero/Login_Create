
import {Link, useNavigate} from "react-router-dom"
import "./form.css"
import { useState } from "react"
import { API } from "../API/api"
import Logoregister from "../assets/LogoRegister.png"
import back from "../assets/Back.png"
import { Envelope,Lock,User,Checks } from "phosphor-react";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from 'react-toastify';

export function Create(){
    const [user,setUser] = useState()
    const [name,setName] = useState()
    const [pass,setPass] = useState()
    const [confPass,setConfPass] = useState()
    const navigate = useNavigate()


    async function createUser(event){
        event.preventDefault()
        function ValidarEmail (email) {
            var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
             return emailPattern.test(email); 
          }
        const payload ={
            name:name,
            email:user,
            password:pass,
            confirmPassword:confPass

        }
        
            
        if(ValidarEmail(payload.email)){
            const request = await API.users.createUrl(payload)
            const data = await request.json()
            if(request.status==200){
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                
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
    function buttonLogin(){
        navigate("/login")
    }    

    return(
   
    <div className="containerUser">
            <div className="contentUser">    
            <div className="contentInfoUser">
                    <img className="img1" src={back} alt="" />
                    <img  className="img2"src={Logoregister} alt="" />
                    <h2>Vamos embarcar?</h2>
                    <p>apenas alguns cliques e começamos</p>

                </div>
                <div className="contentFormUser">
                <form onSubmit={createUser}>  
                
                    <div className="inputViewUser">
                    <User size={32} />
                    <input type="text" id="name" placeholder="Nome" onChange={e=>setName(e.target.value)}/>
                    </div>
                    <div className="inputViewUser">
                    <Envelope size={32} />
                    <input type="text" id="userName"placeholder="Email" onChange={e=>setUser(e.target.value)}/>
                    </div>
            
                    
                    
                    <div className="inputViewUser">
                    <Lock size={32} />
                    <input type="password" id="password" placeholder="Senha" onChange={e=>setPass(e.target.value)}/>
                    </div>
                    <div className="inputViewUser">
                    <Checks size={32} />
                    <input type="password" id="passwordConfirm"placeholder="Confirmação de senha" onChange={e=>setConfPass(e.target.value)}/>
                    </div>
                    
                    <button className="createButton">Registrar</button>
                </form>
                <p>Já tem cadastro? </p>
                <button onClick={buttonLogin} className="buttonLogin">Log in</button>
                </div>
                
        
        </div>
        <ToastContainer/>
        </div>





    )
}