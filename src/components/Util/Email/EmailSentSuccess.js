import { faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from 'react-toastify';
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import DefaultBody from '../../DefaultBody';
import '../../Login/style.css';
import 'bootstrap';

export default function EmailSentSucess() 
{    
    const navigate = useNavigate();    

    function toLogin(){
        navigate('/');
    }

    return(
        <DefaultBody children={{
            children1:
            <div>              
                <ToastContainer />
                    <div className="form-group d-flex justify-content-start mb-0"> 
                    <p style={{ fontSize: '30px', letterSpacing: '1px', lineHeight: '30px', paddingBottom: '1em'}}> Esqueceu sua senha? </p>        
                    </div>
                    <div className="d-flex justify-content-start"> 
                    <div className="form-group m-10">                 
                            <h1> E-mail enviado! </h1> 
                            <p>Verifique sua caixa de entrada e acesso o  
                                <br/>
                                link para redefinição de senha.</p>
                            <div>                          
                                <button className="btn botao-entrar" style={{background: "#3E9F96", color:"#fff", margin: '0.1em'}} onClick={toLogin}>Login</button>                                 
                            </div>                            
                    </div> 
                                                  
                    </div>         
                    <div className="">
                        <div className="form-group d-flex justify-content-center" style={{flexDirection: 'column',padding: '2em', margin: '1em'}}>                                                     
                        </div>
                        <div className="form-group d-flex justify-content-center"> 
                        </div>
                    </div> 
                </div>,              
            children2:
            <div style={{ display: 'flex',justifyContent: 'center', marginTop: '14em'}}>
                <FontAwesomeIcon icon={faEnvelopeOpen} size="8x" style={{color: '#0000005E', justifyContent: 'center'}}/>                          
            </div>
        }} />         
    )
}
