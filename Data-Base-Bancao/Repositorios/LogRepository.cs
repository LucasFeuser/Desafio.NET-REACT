using Microsoft.EntityFrameworkCore;
using PraticaNetCore.Context;
using PraticaNetCore.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces
{
    public class LogRepository : ILogRepository
    {
        private readonly AppDbContext _context;

        public LogRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Models.LogsLogin> BuscarTentativasLogin(DateTime dataParam, DateTime data)
        {

            return _context.LogsLogin
                                 .Where(log => log.DataAcesso >= dataParam && log.DataAcesso <= data)
                                 .ToList();

        }


        public List<Models.LogsLogin> BuscarTentativasLoginDiario()
        {
            return  _context.LogsLogin.ToList();
        }

        public void GerarNovoLog(Models.LogsLogin log)
        {
            _context.LogsLogin.Add(log);
            _context.SaveChangesAsync();
        }
    }
}
