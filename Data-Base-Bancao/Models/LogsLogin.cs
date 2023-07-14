using System;

namespace PraticaNetCore.Models
{
    public class LogsLogin
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Descricao { get; set; }
        public bool LoginSucesso { get; set; }
        public DateTime DataAcesso { get; set; }
    }
}
