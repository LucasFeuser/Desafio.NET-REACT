using System;

namespace PraticaNetCore.ViewModel
{
    public class ConsultaDTO
    {
        public int Id { get; set; }
        public PacienteDTO Paciente { get; set; }
        public DateTime DataIncio { get; set; }
        public DateTime DataFim { get; set; }
        public string Diagnostico { get; set; }
        public string Prescricao { get; set; }
    }
}
