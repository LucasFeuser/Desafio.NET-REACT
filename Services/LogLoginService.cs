using AutoMapper;
using PraticaNetCore.Common.Util;
using PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces;
using PraticaNetCore.Mappers;
using PraticaNetCore.Models;
using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PraticaNetCore.Services
{
    public class LogLoginService : ILogLogin
    {
        private readonly IMapper _mapper;
        private readonly ILogRepository _logRepository;
        public LogLoginService(ILogRepository logRepository,
                                    IMapper mapper)
        {
            _mapper = mapper;
            _logRepository = logRepository;
        }

        public List<Models.LogsLogin> BuscarTentativasLoginDiario()
        {
            var listaLogs = _logRepository.BuscarTentativasLoginDiario();
            if (listaLogs.Count == 0) return new List<Models.LogsLogin>();
            return listaLogs;
        }

        public List<Models.LogsLogin> BuscarTentativasLogin(int horas)
        {
            DateTime data = DateTime.Now;
            var dataParam = Util.DecrementaHora(data, horas);

            var listaLogs = _logRepository.BuscarTentativasLogin(dataParam, data);

            if(listaLogs.Count == 0) return new List<Models.LogsLogin>();

            return listaLogs;
        }

        public void LogError(string email, string descricao, bool loginSucesso, DateTime dataAcesso)
        {
            var log = montaLog(email, descricao, loginSucesso, dataAcesso);
            _logRepository.GerarNovoLog(log);
        }

        public void LogIn(string email, string descricao, bool loginSucesso, DateTime dataAcesso)
        {
            var log = montaLog(email, descricao, loginSucesso, dataAcesso);
            _logRepository.GerarNovoLog(log);
        }

        private Models.LogsLogin montaLog(string email, string descricao, bool loginSucesso, DateTime dataAcesso)
        {
            return new Models.LogsLogin
            {
                Email = email,
                Descricao = descricao,
                LoginSucesso = loginSucesso,
                DataAcesso = dataAcesso
            };
        }
    }
}
