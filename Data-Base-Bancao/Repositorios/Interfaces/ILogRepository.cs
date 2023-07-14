using PraticaNetCore.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces
{
    public interface ILogRepository
    {
        List<Models.LogsLogin> BuscarTentativasLoginDiario();
        List<Models.LogsLogin> BuscarTentativasLogin(DateTime dataParam, DateTime data);
        void GerarNovoLog(Models.LogsLogin log);

    }
}
