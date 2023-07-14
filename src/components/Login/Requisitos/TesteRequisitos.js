import React, { useState, useEffect } from "react";
import {useDevicesCheck}  from './DeviceCheck/devicesCheck';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imagemRequisitos from '../../../assets/img-Requisitos.jpeg';
import {useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import DefaultBody from '../../DefaultBody'
import '../style.css';
import 'bootstrap';

export default function TesteRequisitos() {    
    const {dataMic, dataCamera, dataInternet, dataBrowser, checkDevicesAndInternetSpeed } = useDevicesCheck();
  
    const navigate = useNavigate();
    async function backLogin(event){
        navigate('/');  
    }
   
    return(
        <DefaultBody children={{          
            children1: 
                <div>
                    <ToastContainer />
                    <div className="form-group d-flex justify-content-start mb-0" style={{ fontSize: '30px', letterSpacing: '1px', lineHeight: '30px', paddingBottom: '1em'}}> 
                        <p>Teste de requisitos
                        <br/>
                        técnicos
                        </p>
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
                </div> ,     
            children2:
            <div>
                    <div className="form-group d-flex justify-content-start mb-0" style={{color: '#FFFBFB', 
                         fontSize: '30px', letterSpacing: '1px', lineHeight: '30px'}}> 
                    </div>
                    <div className="d-flex justify-content-start tratar-inputs" style={{color: '#FFFBFB', fontSize: '14px'}}> 
                        <img src={imagemRequisitos} style={{width: '13vw'}}/>      
                    </div>      
                    <div className="form-group d-flex" style={{flexDirection: 'column'}}>
                        <button onClick={backLogin} className="btn estilizar-botoes" style={{background: '#FFFF', color:'#284F72', margin: '0.5em'}}> 
                        <p style={{flex: 'auto', padding: '1px !important'}}>Concluído</p></button>  
                        <button onClick={checkDevicesAndInternetSpeed} className="btn estilizar-botoes" style={{background: '#FFFF', color:'#284F72', margin: '0.5em'}}>
                            <p style={{flex: 'auto', padding: '1px !important'}}>Retestar</p></button>   
                    </div>   
                    <div className="form-group mt-10">                        
                    </div>                       
                    <div className="">
                        <div className="form-group d-flex justify-content-center">                                                                        
                        </div>                            
                    </div>              
            </div>
        }} />   
    )
}
