
import {Link, useNavigate} from "react-router-dom"
import "./form.css"
import { useState } from "react"
import { API } from "../API/api"
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
            if(request.status==201){
                alert(data.message)
                navigate("/User/"+user.id)
                window.location.href=window.location.href
            }else{
                alert(data.message)
            }
        }else{
            alert("Favor inserir um email valido!")
        }
    }
    

    return(
        <div className="containerUser">
            <div className="contentUser">
            <form onSubmit={createUser}>
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" onChange={e=>setName(e.target.value)}/>
            <label htmlFor="userName">E-mail</label>
            <input type="text" id="userName"onChange={e=>setUser(e.target.value)}/>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" onChange={e=>setPass(e.target.value)}/>
            <label htmlFor="passwordConfirm">Confirmação de Senha</label>
            <input type="password" id="passwordConfirm"onChange={e=>setConfPass(e.target.value)}/>
            <button className="createButton">Cadastrar</button>
        </form>

         <p>Já tem cadastro? <Link to="/Login">Clique Aqui!</Link></p>
            </div>
        
    </div>
    )
}