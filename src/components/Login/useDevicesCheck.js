import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Webcam from 'react-webcam';
import api from '../../services/api';

export function useDevicesCheck()
{

    const [validacao, setValidacao] = useState(true);
    const [isMicAvailable, setMicAvailability] = useState(false);
    const [isCameraAvailable, setCameraAvailability] = useState(false);
    const [internetSpeed, setInternetSpeed] = useState(null);
    const [isBrowserCompatible, setIsBrowserCompatible] = useState(true);
    
    let dataMic = {};
    let dataCamera =  {};
    let dataInternet = {};
    let dataBrowser = {};
    let object;

    let mensagemValidacao;
    let spanClasseChanged;
    let tratarFontIcons;
    let tratarTagP;
    let icon;    
  
    useEffect(() => {
      const checkDevices = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
            setCameraAvailability(true);
            stream.getTracks().forEach(track => track.stop());
          })
          .catch(function(err) {
            setCameraAvailability(false);
          });
  
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function(stream) {
            setMicAvailability(true);
            stream.getTracks().forEach(track => track.stop());
          })
          .catch(function(err) {
            setMicAvailability(false);
          });

          if (!navigator.geolocation) {
            setIsBrowserCompatible(false);
          }
      }
  
      checkDevices();
      const timer = setTimeout(() => {
        InternetTesteSpeed(); 
      }, 10000);
      return () => clearTimeout(timer);
    }, []);

    async function InternetTesteSpeed(){
      try
      {
        const response = await api.get('/api/InternetSpeedTeste');
          
              if(response.status === 200) {                
                setInternetSpeed(response.data)   
              }                          
      }
      catch(error){
          alert('Erro no teste de velocidade' + error);
      }
    }

    if(isCameraAvailable)
    {
      dataCamera = successFieldValues("Camera disponivel.");
    }
    else
    {
      dataCamera = warnFieldValues("Camera não encontrada.");
    }

    if(isMicAvailable)
    {
      dataMic = successFieldValues("Microfone disponivel.");      
    }
    else
    {
      dataMic = warnFieldValues("Microfone não encontrado.");      
    }

    if(internetSpeed > 50)
    {
      dataInternet = successFieldValues("Velocidade da internet suficiente.")
      
    }
    else
    {
      dataInternet = warnFieldValues("Velocidade da internet insuficiente.");
    }

    if(isBrowserCompatible)
    {
      dataBrowser = successFieldValues("Navegador compativel")
    }
    else
    {
      dataBrowser = warnFieldValues("Navegador incompativel, tente um outro.");
    }

    function successFieldValues(msg) 
    {
      return{
        mensagem: msg,
        icon : faCheckCircle,
        spanClasseChanged : "input-group-text tratar-span span-success",
        tratarTagP : "validacao-requisitos-message success-message",
        tratarFontIcons : "tratar-font-icons icon-success",
      }        
    }

    function  warnFieldValues(msg) 
    {
      return {
        mensagem: msg,
        icon : faExclamationCircle,
        spanClasseChanged : "input-group-text tratar-span span-warn",
        tratarTagP : "validacao-requisitos-message warn-message",
        tratarFontIcons :"tratar-font-icons icon-warn",
      }
    }    

    return{ dataMic, dataCamera, dataInternet, dataBrowser}
}