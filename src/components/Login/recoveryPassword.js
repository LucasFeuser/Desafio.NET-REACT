import { toast, ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from "react";
import {useDevicesCheck}  from './useDevicesCheck';
import {useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import 'bootstrap';

export default function TesteRequisitos() {    

    const {dataMic, dataCamera, dataInternet, dataBrowser, checkDevicesAndSpeed } = useDevicesCheck();
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    async function backLogin(event){
        navigate('/');  
    }

    async function emailSend(event){
        //Manter o comportamento SPA
        event.preventDefault();
        
        const data = {
            email
        };

        try
        {
                if(data.email == "")
                    return toast.error("Email nao pode ser vazio"); 
                else if(!data.email.includes("@"))
                    return toast.error("Email nao pode ser vazio"); 
            
                const response = await api.post('/api/Helper/EmailSend', data, {
                    validateStatus: function (status) {
                        return (status >= 200 && status < 300) || status > 400 || status < 500;
                    }
                });
            
                if(response.status === 200) {
                    localStorage.setItem('email', email);                    
                    toast.success("Email de recuperacao enviado.");
                } else if(response.status >= 400 || response.status !== 429) {                                      
                    toast.error("Email de recuperacao nao existe.");                
                }  
                else if(response.status === 429) {
                    toast.error("Tentativas de acesso excedida. Tente novamente mais tarde.");  
                }              
                //navigate.push('/alunos');       
        }
        catch(error){
            toast.error("Falha no envio do email.");
            console.log(error); 
        }
    }
   
    return(
        <div className="container login-container d-flex" style={{width: "35vw", height: "45vh"}}>
             <ToastContainer />
                <div className="col-md-12 login-form-3 d-flex justify-content-center">  
                    <div className="form-group m-10">                 
                            <h1> Esqueceu sua senha? </h1> 
                            <p>Informe o endereço de e-mail
                                <br/> cadastrado para receber o link de
                                <br/> redefinição de senha.</p>
                            <div>
                            <div className="input-group">
                        <div className="input-group-prepend">
                                <span className="input-group-text input-format">
                                </span>
                        </div>
                            <input type="text" className="form-control input-format" placeholder="Email recuperação" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}/>                        
                        </div>
                                <button className="btn botao-entrar" style={{background: "#FFFF", color:"#284F72"}} onClick={emailSend}>Recuperar Email</button>                                  
                            </div>                            
                    </div>                                          
            </div>
        </div>
    )
}
