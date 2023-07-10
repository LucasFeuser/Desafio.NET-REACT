import React from "react";
import {BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import Login from './components/Login/Index';
import TesteRequisitos from './components/Login/testeRequisitos';

export default function Rotas(){
    return(
        <Router>        
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/testeRequisitos" element={<TesteRequisitos/>}/>
            </Routes>
        </Router>
    );
}