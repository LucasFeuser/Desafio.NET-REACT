
using System.Collections.Generic;

public class Triagem
{
    public int Id { get; set; }
    public string ResponsavelTriagem { get; set; }
    public string Sintomas { get; set; }
    public string HistoricoMedico { get; set; }
    public ICollection<Paciente> Pacientes { get; set; }
}
