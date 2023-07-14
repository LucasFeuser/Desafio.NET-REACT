import { faEnvelopeCircleCheck, faCheck, faCheckDouble, faVoicemail, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DefaultBody from '../../DefaultBody';
import api from '../../../services/api';
import '../../Login/style.css';
import 'bootstrap';

function useTokenAndEmailFromUrl() {
    const [currentUrl, setCurrentUrl] = useState('');
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        const currentUrl = window.location.href 
        setEmail(email);
        setToken(token);

        window.history.replaceState({}, document.title, "/EmailConfirm");

        try {
            const data = { email, token, currentUrl:"localhost:3000" };
            console.log(data);
            const response = api.post('/api/Account/EmailConfirmation', data, {
                validateStatus: function (status) {
                    return (status >= 200 && status < 300) || status > 400 || status < 500;
                }
            });
            console.log(response);


            if (response.status == 200) {
                toast.success("Email confirmado. Redirecionando...");
                setTimeout(() => {
                }, 6000);
            }

        } catch (error) {
            console.log(error);
            toast.error("Erro na confirmação do email");
        }
    }, []);

    return { token, email };
}


export default function EmailConfirm() {
    const { token, email } = useTokenAndEmailFromUrl();
    const navigate = useNavigate();

    useEffect(() => {
        const confirmEmail = async () => {
           
        }

        confirmEmail();
    }, [email, token, navigate]);

    return (

        <DefaultBody children={{
            children1:
            <div >              
                <ToastContainer />
                    <div className="form-group d-flex justify-content-start mb-0" > 
                        <p style={{fontSize: '33px'}}>Email foi confirmado! </p>                        
                    </div>
                    <div className="d-flex justify-content-start"> 
                    <div className="form-group m-10">                 
                            <div>                       
                            </div>                            
                    </div>                                                   
                    </div>         
                    <div className="">
                        <div className="form-group d-flex justify-content-center" style={{flexDirection: 'column',padding: '2em', margin: '1em'}}>    
                            <FontAwesomeIcon icon={faCheck} size="8x" style={{color: '#358C84', justifyContent: 'center', width: '1.5em'}}/> 
                        </div>
                        <div className="form-group d-flex justify-content-center"> 
                        </div>
                    </div> 
                </div>,              
            children2:
            <div style={{ display: 'flex',justifyContent: 'center', marginTop: '8em'}}>
                <FontAwesomeIcon icon={faUserCheck} size="10x" style={{color: '#0000005E', justifyContent: 'center'}}/> 
            </div>
        }} />  
    )
}
