import {Link} from "react-router-dom"
import "./form.css"
import { API } from "../API/api"
import { useState } from "react"
export function Login(){
    const [user,setUser] = useState()
    const [pass,setPass] = useState()


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

            if(request.status==200){
                alert("Sucesso",data.message)
            }else{
                alert("Aconteceu algo!",data.message)
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
        <p>Ainda não tem cadastro? <Link to="/user">Clique Aqui!</Link></p>
        </div>
        </div>
   )
}