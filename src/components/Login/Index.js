import React, {useState} from 'react';
import { faUser, faLock, faCamera, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import 'bootstrap';


export default function Login(){
    
    //retorna de uma TUPLE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    async function realizarTestes(event){
        navigate('/testeRequisitos');  
    }

    async function login(event){
        //Manter o comportamento SPA
        event.preventDefault();
        
        const data = {
            email, password
        };

        try
        {
                const response = await api.post('/api/Account/LoginUser', data, {
                    validateStatus: function (status) {
                        return (status >= 200 && status < 300) || status > 400 || status < 500;
                    }
                });
            
                if(response.status === 200) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('expiration', response.data.expiration);
                    alert('logado com sucesso');
                } else if(response.status >= 400 || response.status !== 429) {                                      
                    alert('Email e ou Senha invalidos');                 
                }  
                else if(response.status === 429) {
                    alert('Tentativas de acesso excedida. Tente novamente mais tarde.');
                }              

                //navigate.push('/alunos');       
        }
        catch(error){
            alert('O login falhou' + error);
        }
    }

    return(<div className="container login-container">
    <div className="row">
        <div className="col-md-6 login-form-1">             
            <form onSubmit={login}>
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
                <div className="margem-botoes">
                    <div className="form-group d-flex justify-content-center mt-10">                    
                        <button type="submit" className="btn botao-entrar">Entrar</button>                                     
                    </div>
                    <div className="form-group d-flex justify-content-center"> 
                        <a href="#" class="ForgetPwd">Esqueceu sua senha?</a>
                    </div>
                </div>        
            </form>
               
        </div>

        <div className="col-md-6 login-form-2">
            <form onSubmit={realizarTestes}>                
                <div className="form-group d-flex justify-content-start mb-0"> 
                    <h1>Teste de 
                        <br/>
                        requisitos</h1>
                </div>
                <div className="d-flex justify-content-start tratar-inputs"> 
                    <h6 className="estilizar-font-form2">Teste seus acessos a câmera, 
                    <br/>
                    microfone e velocidade da internet.</h6>          
                </div>
                    <FontAwesomeIcon icon={faWaveSquare} style={{height: '50px'}}/>
                    <FontAwesomeIcon icon={faWaveSquare} style={{height: '50px'}}/>
                    <FontAwesomeIcon icon={faWaveSquare} style={{height: '50px'}}/>
                    <FontAwesomeIcon icon={faWaveSquare} style={{height: '50px'}}/>
                    <FontAwesomeIcon icon={faCamera} style={{ marginLeft: '50px',height: '50px'}}/>
                <div className="margem-botoes">                        
                    <div className="form-group d-flex justify-content-center mt-10">                    
                        <button type="submit" className="btn botao-testar">Realizar Teste</button>                                     
                    </div>   
                </div>  
            </form>
                                                
        </div>
    </div>
</div>)
}