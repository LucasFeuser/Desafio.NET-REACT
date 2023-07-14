import React, {useState} from 'react';
import { faUser, faLock, faCamera, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import DefaultBody from '../DefaultBody'


export default function Login()
{  
    const [currentLocal, setCurrentLocal] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    async function realizarTestes(event){
        event.preventDefault();   
        navigate('/TesteRequisitos');  
    };

    async function recoveryPass(event){
        event.preventDefault();   
        navigate('/RecoveryPassword');
    };

    function loginValidation(event)
    {
        if (password === '' || email === ''&& !toast.isActive("nullValidation")) 
            return toast.error("Email ou senha não podem ser vazios.", { toastId: "nullValidation" });

        if (password.length < 6 && !toast.isActive("passwordlength")) 
            return toast.error("A senha deve ter pelo menos 6 caracteres.", { toastId: "passwordlength" });

        if (!email.includes("@") && !toast.isActive("emailIncorrectFormat")) 
        return toast.error("O formato do email está incorreto.", { toastId: "emailIncorrectFormat" });   

        Login(event);
    };


    async function Login(event)
    {        
        event.preventDefault();     
        setCurrentUrl(window.location.href);  
        const data = {email, password , currentUrl};

        try
        {
                    const response = await api.post('/api/Account/LoginUser', data, {
                        validateStatus: function (status) {
                            return (status >= 200 && status < 300) || status > 400 || status < 500;
                        }
                    });

                    if(response.status === 200)
                    {                        
                        if(response.data.includes("Email confirmação enviado") && !response.data.token)
                        {                                
                                  toast.error("Seu email ainda não foi confirmado!"); 
                           return toast.success("Email de confirmação enviado. Verifique sua caixa de entrada!");                                
                        }                  
                        
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('HomeAuth', response.data.token);
                        toast.success("Logando...");  
                        setTimeout(() => {
                            navigate('/Home');
                        }, 6000);  
                    }

                    if(response.status === 400){
                        toast.error("Usuario não encontrado.")   
                    }

                    if(response.status === 404){
                        toast.error("Dados de login incorretos. Usuario não encontrado")   
                    }
                        
                    if(response.status === 500){
                        toast.error("Servidor indisponivel. Tente novamente mais tarde.")   
                    }                     
                
                        
        }
        catch(error){
            toast.error("Falha no login.");
            console.log(error); 
        }
    };
    

    return (
        <DefaultBody children={{ 
            children1: 
            <div>
                <ToastContainer />
                    <div className="form-group d-flex justify-content-start mb-0"> 
                            <h1>Bem vindo,</h1>
                    </div>
                    <div className="d-flex justify-content-start tratar-inputs"> 
                        <h5 className="estilizar-font">Faça o login para continuar.</h5>          
                    </div>

                    <div className="form-group mt-10">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text input-format">
                                    <FontAwesomeIcon icon={faUser} style={{color: '#0000005E'}}/>
                                </span>
                            </div>
                            <input type="text" className="form-control input-format" placeholder="Usuário" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}/>                        
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text input-format">
                                    <FontAwesomeIcon icon={faLock} style={{color: '#0000005E'}}/>
                                </span>
                            </div>
                            <input type="password" className="form-control input-format" placeholder="Senha" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </div>   
                    
                    <div className="">
                        <div className="form-group d-flex justify-content-center">                    
                            <button type="button" className="btn estilizar-botoes" onClick={loginValidation} style={{background: '#3E9F96', color: '#fff', fontSize: '17px !important'}}>Entrar</button>                                     
                        </div>
                        <div className="form-group d-flex justify-content-center"> 
                            <a href="#" onClick={recoveryPass}  className="ForgetPwd">Esqueceu sua senha?</a>
                        </div>
                    </div>        
                    
                </div>, 
            children2: 
            <div>
                    <div className="form-group d-flex justify-content-start mb-0" style={{color: '#FFFBFB', fontSize: '30px', letterSpacing: '1px', lineHeight: '30px'}}> 
                       <p>Teste de 
                        <br/>
                        requisitos</p>
                    </div>
                    <div className="d-flex justify-content-start tratar-inputs" style={{color: '#FFFBFB', fontSize: '14px'}}> 
                        <p>Teste seus acessos a câmera, 
                            <br/>
                            microfone e velocidade da internet.
                        </p>           
                    </div>      
                    <div className="form-group mt-10">                        
                    </div>
                    <div className="form-group">
                    </div>      
                    <div className="">
                        <div className="form-group d-flex justify-content-center">                    
                            <button type="submit" className="btn estilizar-botoes" onClick={realizarTestes} style={{marginTop: '3em'}}>Realizar Teste</button>                                                                       
                        </div>  
                        <div className="form-group d-flex justify-content-center">                             
                        </div>                      
                    </div>               
            </div>
        }} />
    );
}
