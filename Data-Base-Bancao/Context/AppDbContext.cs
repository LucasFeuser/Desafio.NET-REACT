using Challenge.Application.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PraticaNetCore.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PraticaNetCore.Context
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        public DbSet<Paciente> Paciente { get; set; }
        public DbSet<Consulta> Consulta { get; set; }
        public DbSet<Triagem> Triagem { get; set; }
        public DbSet<Profissional> Profissional { get; set; }
        public DbSet<ProfissionalPaciente> ProfissionalPacientes { get; set; }

        public DbSet<LogsLogin> LogsLogin { get; set; }
    }
}
