
using Challenge.Application.DTOs;
using PraticaNetCore.ViewModel.Types;
using System.Collections.Generic;

public class Paciente
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public int Idade { get; set; }
    public GeneroEnum Genero { get; set; }
    public int TriagemId { get; set; }
    public Triagem Triagem { get; set; }
    public ICollection<Consulta> Consultas { get; set; }
    public ICollection<ProfissionalPaciente> ProfissionalPacientes { get; set; }
}
