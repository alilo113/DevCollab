import React from "react"
import { File } from "./components/CodeFile/file"
import { Login } from "./components/auth/login"
import { Signup } from "./components/auth/signup"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login/>} path="/login"/>
        <Route element={<Signup/>} path="/signup"/>
        <Route element={<File/>} path="/"/>
      </Routes>
    </Router>
  )
}

export default App
