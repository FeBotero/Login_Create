
import "./App.css"
import { Route, Routes } from "react-router-dom"
import { Create } from "./Pages/Create"
import { Home } from "./Pages/Home"
import { Header } from "./components/Header"
import { Login } from "./Pages/Login"



export function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/"index  element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/user" element={<Create/>}/>

      </Routes>
      
    </div>
  )
}

