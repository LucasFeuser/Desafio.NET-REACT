using PraticaNetCore.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PraticaNetCore.Services.Interfaces
{
    public interface ILogLogin
    {
        List<Models.LogsLogin> BuscarTentativasLoginDiario();
        List<Models.LogsLogin> BuscarTentativasLogin(int horas);
        void LogIn(string email, string Descricao, bool LoginSucesso, DateTime DataAcesso);
        void LogError(string email, string Descricao, bool LoginSucesso, DateTime DataAcesso);
    }
}
