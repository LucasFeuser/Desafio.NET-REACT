import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {useDevicesCheck}  from './useDevicesCheck';

import './style.css';
import 'bootstrap';

export default function TesteRequisitos() {    

    const {dataMic, dataCamera, dataInternet, dataBrowser} = useDevicesCheck();

    return(
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">             
                    <form >
                        <div className="form-group d-flex justify-content-start mb-0"> 
                            <h1>Teste de requisitos 
                                <br/>
                                técnicos
                            </h1>
                        </div>
                        <div className="d-flex justify-content-start tratar-inputs"> 
                            <h5 className="estilizar-font">Faça o login para continuar.</h5>          
                        </div>

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
                        <div className="form-group">                               
                        </div>        
                    </form>
                </div>

                <div className="col-md-6 login-form-2">  
                    
                </div>        
            </div>
        </div>
    )
}
