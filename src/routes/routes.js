import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import EmailSentSuccess from '../components/Util/Email/EmailSentSuccess';
import EmailConfirm from '../components/Util/Email/EmailConfirm';

import PasswordChanged from '../components/Util/Password/PasswordChanged';
import RecoveryPassword from '../components/Util/Password/RecoveryPassword';

import Calendario from '../components/Home/Atendimento/Calendario';

import TesteRequisitos from '../components/Login/Requisitos/TesteRequisitos';
import Login from '../components/Login/Login';

import Home from '../components/Home/Home';
import Profile from '../components/Home/Profile/Profile';

import DefaultBody from '../components/DefaultBody';


export default function Rotas() {

  const HomeAuth = localStorage.getItem('HomeAuth');

  function isAuthenticate(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  function PrivateRoute({ children }) {
    return isAuthenticate() ? children : <Navigate to="/" replace />;
  }
  
  return (
    <Router>        
      <Routes>
        <Route path="/DefaultBody" element={<DefaultBody />} />
        <Route path="/" element={<Login />} />
  
        <Route path="/Home" 
        element={<PrivateRoute> <Home/> </PrivateRoute>}/>
  
        <Route path="/Calendario" 
        element={<PrivateRoute> <Calendario/> </PrivateRoute> } 
        onEnter={() => localStorage.setItem('HomeAuth', 'true')}/>
  
        <Route path="/Profile" 
        element={<PrivateRoute> <Profile /> </PrivateRoute>} 
        onEnter={() => localStorage.setItem('HomeAuth', 'true')}/>
       
        <Route path="/EmailConfirm" element={<EmailConfirm/>} />
        <Route path="/TesteRequisitos" element={<TesteRequisitos />} />
        <Route path="/RecoveryPassword" element={<RecoveryPassword />} />
        <Route path="/EmailSentSuccess" element={<EmailSentSuccess />}/>
        <Route path="/PasswordChanged"element={ <PasswordChanged /> }/>
      </Routes>
    </Router>
  );
}
