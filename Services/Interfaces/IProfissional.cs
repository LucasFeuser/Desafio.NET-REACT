using System.Collections.Generic;

namespace PraticaNetCore.Services.Interfaces
{
    public interface IProfissional
    {
        List<Consulta> BuscarConsultas();
        Profissional BuscarDadosProfissional();
    }
}
