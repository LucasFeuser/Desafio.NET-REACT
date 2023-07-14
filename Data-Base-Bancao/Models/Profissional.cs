
using Challenge.Application.DTOs;
using System.Collections.Generic;

public class Profissional
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Especialidade { get; set; }
    public string Identificador { get; set; }
    public ICollection<ProfissionalPaciente> ProfissionalPacientes { get; set; }
}
