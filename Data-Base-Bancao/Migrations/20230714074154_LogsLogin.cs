using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PraticaNetCore.Migrations
{
    public partial class LogsLogin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfissionalPacientes_Paciente_PacienteDTOId",
                table: "ProfissionalPacientes");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfissionalPacientes_Profissional_ProfissionalDTOId",
                table: "ProfissionalPacientes");

            migrationBuilder.DropIndex(
                name: "IX_ProfissionalPacientes_PacienteDTOId",
                table: "ProfissionalPacientes");

            migrationBuilder.DropIndex(
                name: "IX_ProfissionalPacientes_ProfissionalDTOId",
                table: "ProfissionalPacientes");

            migrationBuilder.DropColumn(
                name: "PacienteDTOId",
                table: "ProfissionalPacientes");

            migrationBuilder.DropColumn(
                name: "ProfissionalDTOId",
                table: "ProfissionalPacientes");

            migrationBuilder.AddColumn<int>(
                name: "ProfissionalId1",
                table: "ProfissionalPacientes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "LogsLogin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<int>(type: "int", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoginSucesso = table.Column<bool>(type: "bit", nullable: false),
                    DataAcesso = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogsLogin", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProfissionalPacientes_PacienteId",
                table: "ProfissionalPacientes",
                column: "PacienteId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfissionalPacientes_ProfissionalId1",
                table: "ProfissionalPacientes",
                column: "ProfissionalId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ProfissionalPacientes_Paciente_PacienteId",
                table: "ProfissionalPacientes",
                column: "PacienteId",
                principalTable: "Paciente",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfissionalPacientes_Profissional_ProfissionalId1",
                table: "ProfissionalPacientes",
                column: "ProfissionalId1",
                principalTable: "Profissional",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfissionalPacientes_Paciente_PacienteId",
                table: "ProfissionalPacientes");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfissionalPacientes_Profissional_ProfissionalId1",
                table: "ProfissionalPacientes");

            migrationBuilder.DropTable(
                name: "LogsLogin");

            migrationBuilder.DropIndex(
                name: "IX_ProfissionalPacientes_PacienteId",
                table: "ProfissionalPacientes");

            migrationBuilder.DropIndex(
                name: "IX_ProfissionalPacientes_ProfissionalId1",
                table: "ProfissionalPacientes");

            migrationBuilder.DropColumn(
                name: "ProfissionalId1",
                table: "ProfissionalPacientes");

            migrationBuilder.AddColumn<int>(
                name: "PacienteDTOId",
                table: "ProfissionalPacientes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProfissionalDTOId",
                table: "ProfissionalPacientes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProfissionalPacientes_PacienteDTOId",
                table: "ProfissionalPacientes",
                column: "PacienteDTOId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfissionalPacientes_ProfissionalDTOId",
                table: "ProfissionalPacientes",
                column: "ProfissionalDTOId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProfissionalPacientes_Paciente_PacienteDTOId",
                table: "ProfissionalPacientes",
                column: "PacienteDTOId",
                principalTable: "Paciente",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfissionalPacientes_Profissional_ProfissionalDTOId",
                table: "ProfissionalPacientes",
                column: "ProfissionalDTOId",
                principalTable: "Profissional",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
