
import React from "react"; 
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"; 
import Login from "./pages/login"; 
import Forgetpassword from "./pages/forgetpass"; 
import Reset from './pages/resetpass';
import Home from './pages/Home';
import Signup from './pages/signup'

const App = () => { 
  return ( 
      <Router> 
        
        <Routes> 
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/forgetpass" element={<Forgetpassword/>}/> 
            <Route path="/reset" element={<Reset/>}/>
            <Route path="/home" element={<Home/>}/> 
        </Routes> 
        
      </Router> 
  ); 
} 
  
export default App;