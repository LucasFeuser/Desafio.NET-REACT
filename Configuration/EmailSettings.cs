using Microsoft.Extensions.Hosting;
using System.Security.Cryptography.Xml;
using System;

namespace PraticaNetCore.Configuration
{
    public sealed class EmailSettings
    {
        public string EmailFromAddress { get; } = "";
        public string Password { get; } = ""; //SUA KEY NO GMAIL GERADA DENTRO DA ABA TWO-AUTH
        public string SmtpAddress { get; } = "smtp.gmail.com"; //ADRESS PARA GMAIL
        public int PortNumber { get; } = 587; //PORTASMTP

                //Gmail:
                //SmtpAddress: "smtp.gmail.com"
                //PortNumber: 587
                //Outlook.com(anteriormente Hotmail):
                
                //SmtpAddress: "smtp-mail.outlook.com"
                //PortNumber: 587
                //Yahoo Mail:
                
                //SmtpAddress: "smtp.mail.yahoo.com"
                //PortNumber: 587
                //AOL Mail:
                
                //SmtpAddress: "smtp.aol.com"
                //PortNumber: 587
                //Mail.com:
                
                //SmtpAddress: "smtp.mail.com"
                //PortNumber: 587
                //Zoho Mail:
                
                //SmtpAddress: "smtp.zoho.com"
                //PortNumber: 587
                //Office 365 (para contas de empresa ou estudante):
                
                //SmtpAddress: "smtp.office365.com"
                //PortNumber: 587
    }

}
