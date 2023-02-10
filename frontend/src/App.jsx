import "./App.css"
import { Route, Routes,Navigate  } from "react-router-dom"
import { Create } from "./Pages/Create"
import { Home } from "./Pages/Home"
import { Header } from "./components/Header"
import { Login } from "./Pages/Login"
import { Users } from "./Pages/Users"

import { useEffect, useState } from "react"

export function App() {
  const [user,setUser]=useState()

    function showUser(){
      const infoUser = localStorage.getItem("user")
      setUser(JSON.parse(infoUser))  
    }

    useEffect(()=>{showUser(  )},[])

  return (
    <div className="App">
            <Routes>
          <Route exact path="/"index  element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Create/>}/>
          <Route exact path="/user/:id" element={<Users />}/>
        
      </Routes>
      
    </div>
  )
}

