
import {Link} from "react-router-dom"
import "./form.css"
export function Create(){
    return(
        <div className="containerUser">
            <div className="contentUser">
            <form action="">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name"/>
            <label htmlFor="userName">E-mail</label>
            <input type="text" id="userName"/>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password"/>
            <label htmlFor="passwordConfirm">Confirmação de Senha</label>
            <input type="password" id="passwordConfirm"/>
            <button className="createButton">Cadastrar</button>
        </form>

         <p>Já tem cadastro? <Link to="/Login">Clique Aqui!</Link></p>
            </div>
        
    </div>
    )
}