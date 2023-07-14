import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import Webcam from 'react-webcam';


export function useDevicesCheck()
{
    const [isBrowserCompatible, setIsBrowserCompatible] = useState(true);
    const [isCameraAvailable, setCameraAvailability] = useState(false);
    const [isMicAvailable, setMicAvailability] = useState(false);
    const [internetSpeed, setInternetSpeed] = useState(null);

    let dataInternet = {};
    let dataBrowser = {};
    let dataCamera =  {};
    let dataMic = {};

    const SUPERIMAGEMPATH = "https://img.freepik.com/fotos-gratis/uma-pintura-digital-de-uma-montanha-com-uma-arvore-colorida-em-primeiro-plano_1340-25699.jpg?w=740&t=st=1689182472~exp=1689183072~hmac=41106b332e83d75b548956df3e07c63047a789de04421d8b69c753125eedcb37";  
    const DOWNLOADSIZE = 5739426;
  
      const checkDevices =  () => {
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
            const isChromeOrEdge = /Chrome|Edg\//.test(navigator.userAgent)
            console.log(navigator.userAgent)
        if (isChromeOrEdge) {
            setIsBrowserCompatible(true);
        }
    }  

    const medirVelocidadeInternet = async () => {      
        var startTime, endTime;
        var download = new Image();
        download.onload = function () {
            endTime = (new Date()).getTime();
            showResults();
        }
        
        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = SUPERIMAGEMPATH + cacheBuster;
        
        function showResults(){
          var duration = (endTime - startTime) / 1000;
          var bitsLoaded = DOWNLOADSIZE * 8;
          var speedBps = (bitsLoaded / duration).toFixed(2);
          var speedKbps = (speedBps / 1024).toFixed(2);
          var speedMbps = (speedKbps / 1024).toFixed(2);
          setInternetSpeed(speedMbps); 
        }               
      };
    
    const checkDevicesAndInternetSpeed =  () => {
        checkDevices();
        medirVelocidadeInternet().then((response) => {setInternetSpeed(response)});
    }

    useEffect(() => {
        checkDevicesAndInternetSpeed();
    }, []);        

    if(isCameraAvailable)
      dataCamera = successFieldValues("Camera disponivel.");
    else    
      dataCamera = warnFieldValues("Camera não encontrada.");

    if(isMicAvailable)     
      dataMic = successFieldValues("Microfone disponivel.");      
    else    
      dataMic = warnFieldValues("Microfone não encontrado.");      

    if(internetSpeed > 10)    
      dataInternet = successFieldValues("Velocidade da internet suficiente.")
    else    
      dataInternet = warnFieldValues("Velocidade da internet insuficiente.");

    if(isBrowserCompatible)    
      dataBrowser = successFieldValues("Navegador compativel.")    
    else    
      dataBrowser = warnFieldValues("Navegador incompativel, <br/> tente acessar por um outro.");

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

    return{ dataMic, dataCamera, dataInternet, dataBrowser, checkDevicesAndInternetSpeed } 
}