import React, { useState, useEffect } from "react";
import {useDevicesCheck}  from './useDevicesCheck';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import imagemRequisitos from '../../assets/img-Requisitos.jpeg';
import {useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './style.css';
import 'bootstrap';

export default function TesteRequisitos() {    

    const {dataMic, dataCamera, dataInternet, dataBrowser, checkDevicesAndSpeed } = useDevicesCheck();

    const navigate = useNavigate();
    async function backLogin(event){
        navigate('/');  
    }
   
    return(
        <div className="container login-container">
            <ToastContainer />

            <div className="row">
                <div className="col-md-6 login-form-1">  
                <div className="form-group d-flex justify-content-start m-5">                 
                        <h1>Teste de requisitos
                            <br/>
                            tecnicos
                        </h1>
                    </div>                           
                    <form >                                                                    
                        <div className="form-group mt-10">                        
                            <div className="input-group-prepend">
                                <span className={dataMic.spanClasseChanged}>                              
                                    <FontAwesomeIcon icon={dataMic.icon} className={dataMic.tratarFontIcons} />     
                                    <p className={dataMic.tratarTagP}>{dataMic.mensagem}</p>                                                            
                                </span>
                            </div>                                                        
                            <div className="input-group-prepend">
                                <span className={dataCamera.spanClasseChanged}>
                                    <FontAwesomeIcon icon={dataCamera.icon} className={dataCamera.tratarFontIcons} />       
                                    <p className={dataCamera.tratarTagP}>{dataCamera.mensagem}</p>                              
                                </span>
                            </div>       
                            <div className="input-group-prepend">
                                <span className={dataInternet.spanClasseChanged}>
                                    <FontAwesomeIcon icon={dataInternet.icon} className={dataInternet.tratarFontIcons} />    
                                    <p className={dataInternet.tratarTagP}>{dataInternet.mensagem}</p>                                                           
                                </span>
                            </div>                                                              
                            <div className="input-group-prepend">
                                
                                <span className={dataBrowser.spanClasseChanged}>
                                    <FontAwesomeIcon icon={dataBrowser.icon} className={dataBrowser.tratarFontIcons} />       
                                    <p className={dataBrowser.tratarTagP}>{dataBrowser.mensagem}</p>                              
                                </span>
                            </div>                                                      
                        </div>                             
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <div className="justify-content-center d-flex align-items-center flex-column pb-5 m-">
                        <img src={imagemRequisitos} style={{width: '45vh', margin: '15% 0% 3% 0%'}}/>
                        <div>
                            <button onClick={backLogin} className="btn botao-entrar" style={{background: '#FFFF', color:'#284F72'}}>Concluído</button>  
                            <button onClick={checkDevicesAndSpeed} className="btn botao-entrar" style={{background: '#FFFF', color:'#284F72'}}>Retestar</button>
                        </div>                                                                                  
                    </div>                    
                </div>  
            </div>
        </div>
    )
}
