import { toast, ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from "react";
import {useDevicesCheck}  from '../../Login/Requisitos/DeviceCheck/devicesCheck';
import { faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';
import api from '../../../services/api';
import '../../Login/style.css';
import DefaultBody from '../../DefaultBody';
import 'bootstrap';

export default function RecoveryPassword() {    

    const {dataMic, dataCamera, dataInternet, dataBrowser, checkDevicesAndSpeed } = useDevicesCheck();
    const [email, setEmail] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');

    const navigate = useNavigate();

    function retonarLogin(){
        navigate('/');
    }


    async function emailSend(event){
        //Manter o comportamento SPA
        event.preventDefault();
        setCurrentUrl(window.location.href);     

        const data = {
            email,
            Subject : "Redefinição de senha consultorio Pro",
            Body: "",
            IsHtml : true,
            currentUrl
        };

        try
        {
                if(data.email == "")
                    return toast.error("Email nao pode ser vazio"); 
                else if(!data.email.includes("@"))
                    return toast.error("Email nao pode ser vazio"); 
                else if(!data.email.includes("gmail"))    
                    data.Body = "Corpo para hotmail, outlook";
            
                const response = await api.post('/api/Account/PasswordRecovery', data, {
                    validateStatus: function (status) {
                        return (status >= 200 && status < 300) || status > 400 || status < 500;
                    }
                });
                toast.error(response.status)    
                if(response.status === 200) 
                {
                    localStorage.setItem('email', email);                    
                    navigate('/emailSentSuccess');                                   
                } 
                else if(response.status >= 400 || response.status !== 429) 
                {                                      
                    toast.error("Email de recuperacao nao existe.");                
                }                  
                else if(response.status === 500) 
                {
                    toast.error("Servidor inacessivel no momento. Tente novamente mais tarde...");  
                }                                
        }
        catch(error){
            toast.error("Falha no envio do email.");
            console.log(error); 
        }
    }
   
    return(
        <DefaultBody children={{
            children1:
            <div>              
                <ToastContainer />
                    <div className="form-group d-flex justify-content-start mb-0"> 
                    <p style={{ fontSize: '30px', letterSpacing: '1px', lineHeight: '30px', paddingBottom: '1em'}}> Esqueceu sua senha? </p>        
                    </div>
                    <div className="d-flex justify-content-start tratar-inputs"> 
                            <p>Informe o endereço de e-mail
                                        <br/> cadastrado para receber o link de
                                        <br/> redefinição de senha.</p>
                                                  
                    </div>        

                    <input type="text" className="form-control input-format" placeholder="Email recuperação" style={{border:'4px solid #000'}}
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)}/>   

                    <div className="">
                        <div className="form-group d-flex justify-content-center" style={{flexDirection: 'column',padding: '2em', margin: '1em'}}>                    
                                <button className="btn botao-entrar" style={{background: "#3E9F96", color:"#fff"}} onClick={emailSend}>Recuperar Email</button>     
                                <button className="btn botao-entrar" style={{background: "#3E9F96", color:"#fff", margin: '0.1em'}} onClick={retonarLogin}>Cancelar</button>                                    
                        </div>
                        <div className="form-group d-flex justify-content-center"> 
                        </div>
                    </div> 
                </div>
,              
            children2:
            <div style={{ display: 'flex',justifyContent: 'center', marginTop: '14em'}}>
                <FontAwesomeIcon icon={faEnvelopesBulk} size="8x" style={{color: '#0000005E', justifyContent: 'center'}}/>                          
            </div>
        }} />       
    )
}