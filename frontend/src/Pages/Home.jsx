import "./Home.css"
import homeImage from "../assets/homeImage.png"
export function Home(){
    return(
    <div className="containerHome">
        <h1 className="messageHello">Bem vindo ao nosso espaço</h1>
        <img src={homeImage} alt="" />
    </div>)
}