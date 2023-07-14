using System.ComponentModel.DataAnnotations;

namespace Challenge.Application.DTOs
{
    public class ProfissionalPaciente
    {
        [Key]
        public int ProfissionalId { get; set; }
        public int PacienteId { get; set; }
    }
}
