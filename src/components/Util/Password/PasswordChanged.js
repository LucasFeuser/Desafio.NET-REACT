import { faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import api from '../../../services/api';
import '../../Login/style.css';
import 'bootstrap';

//Tratamento no carregamento da
function useTokenAndEmailFromUrl() {
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const email = urlParams.get('email');
  
      if (!token || !email) {
        console.error('Token ou email não enviados no path da url');
        return;
      }
  
      if (!email.includes('@')) {
        console.error('Email não é valido');
        return;
      }
  
      setEmail(email);
      setToken(token);
  
      window.history.replaceState({}, document.title, "/PasswordChanged");
    }, []);
  
    return { token, email };
  }

export default function PasswordChanged() 
{    
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const {token, email} = useTokenAndEmailFromUrl();   
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  

    function PasswordValid(password, passwordConfirm) 
    {         
        if (password.length  < 6 && !toast.isActive("passwordlength")) 
            return toast.error("A senha deve ter pelo menos 6 caracteres", { toastId: "passwordlength" });
              
        if (!/[a-z]/.test(password) && !toast.isActive("UpperPassw")) 
            return toast.error("A senha deve conter pelo menos um caractere minúsculo" , { toastId: "UpperPassw" });          
      
        if (!/[A-Z]/.test(password) && !toast.isActive("LowerPassw")) 
            return toast.error("A senha deve conter pelo menos um caractere maiúsculo" , { toastId: "LowerPassw" });          
      
        if (!/[0-9]/.test(password) && !toast.isActive("numberPassw")) 
        return toast.error("A senha deve conter pelo menos um número" , { toastId: "numberPassw" });          
      
        if (!/[^A-Za-z0-9]/.test(password) && !toast.isActive("specialCharacterPassw")) 
            return toast.error("A senha deve conter pelo menos um caractere especial", { toastId: "specialCharacterPassw" });          

        if (password !== passwordConfirm && !toast.isActive("passwordConfirm")) 
            return toast.error("As senhas devem ser iguais", { toastId: "passwordConfirm" });          
        
        setPassword(password);
        trocarSenha();        
    };

    async function trocarSenha()
    {        
        const data = {email, token, password: password}
        try
        {                    
                const response = await api.post('/api/Account/PasswordChanged', data, {
                    validateStatus: function (status) {
                        return (status >= 200 && status < 300) || status > 400 || status < 500;
                    }
                });
            
                if(response.status === 200) 
                {                   
                    toast.success("Senha alterada. Redirecionando...");  
                    setTimeout(() => {
                        navigate('/');
                    }, 6000);    
                } 
                else if(response.status >= 400 || response.status !== 429) 
                {                                      
                    toast.error("Erro na troca da senha.");                
                }  
                else if(response.status === 429) 
                {
                    toast.error("Tentativas de acesso excedida. Tente novamente mais tarde.");  
                }                                 
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
                    <div className="form-group mt-10">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text input-format">
                                </span>
                            </div>
                            <input type="password" className="form-control input-format" placeholder="Senha" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}/>                        
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text input-format">
                                </span>
                            </div>
                            <input type="password" className="form-control input-format" placeholder="Confirmar Senha" 
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}/>
                        </div>
                    </div>   
                    <button className="btn botao-entrar" style={{background: "#FFFF", color:"#284F72"}} onClick={() => PasswordValid(password,passwordConfirm)}>Redefinir Senha</button>  
                    <button className="btn botao-entrar" style={{background: "#FFFF", color:"#284F72"}} onClick={() => navigate("/")}>Cancelar</button>  
                </div>
            </div>
        </div>
        
    ) 
}

