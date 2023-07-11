import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Webcam from 'react-webcam';


export function useDevicesCheck()
{
    const [isBrowserCompatible, setIsBrowserCompatible] = useState(true);
    const [isCameraAvailable, setCameraAvailability] = useState(false);
    const [isMicAvailable, setMicAvailability] = useState(false);
    const [internetSpeed, setInternetSpeed] = useState(null);
    const [validacao, setValidacao] = useState(true);
    const [speed, setSpeed] = useState(null);

    let dataInternet = {};
    let dataBrowser = {};
    let dataCamera =  {};
    let dataMic = {};
    let object;

    let mensagemValidacao;
    let spanClasseChanged;
    let tratarFontIcons;
    let tratarTagP;
    let icon;    
  
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

        //Verificar compatibilidade de browser
        if (!navigator.geolocation) {
            setIsBrowserCompatible(false);
        }
    }  

    //Baixar arquivo e validar velocidade da internet
    const measureSpeed = async () => {
        const startTime = Date.now();
        const response = await fetch('https://eu.httpbin.org/stream-bytes/50000000');
        const endTime = Date.now();

        if (!response.ok) {
            console.error('Failed to download file');
            return;
        }

        const data = await response.arrayBuffer();
        const duration = (endTime - startTime) / 1000; 
        const bitsLoaded = data.byteLength * 8;
        const speed = bitsLoaded / duration;

        setSpeed(speed);
    };

    const checkDevicesAndSpeed = () => {
        checkDevices();
        measureSpeed();
    }

    useEffect(() => {
        checkDevicesAndSpeed();
    }, []);        

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

    if(speed > 50)
    {
      dataInternet = successFieldValues("Velocidade da internet suficiente.")
      
    }
    else
    {
      dataInternet = warnFieldValues("Velocidade da internet insuficiente.");
    }

    if(isBrowserCompatible)
    {
      dataBrowser = successFieldValues("Navegador compativel.")
    }
    else
    {
      dataBrowser = warnFieldValues("Navegador incompativel, tente acessar por um outro.");
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
        tratarFontIcons :"tratar-font-icons icon-warn icon-error",
      }
    }    

    

    return{ dataMic, dataCamera, dataInternet, dataBrowser, checkDevicesAndSpeed } 
}