using PraticaNetCore.ViewModel.Types;
using System.Collections.Generic;

namespace PraticaNetCore.ViewModel
{
    public class PacienteDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public GeneroEnum Genero { get; set; }
        public TriagemDTO Triagem { get; set; }
    }
}
