
using System;

public class Consulta
{
    public int Id { get; set; }
    public int PacienteId { get; set; }
    public Paciente Paciente { get; set; }
    public DateTime DataInicio { get; set; }
    public DateTime DataFim { get; set; }
    public string Diagnostico { get; set; }
    public string Prescricao { get; set; }
}
