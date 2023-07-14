using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PraticaNetCore.Context;
using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.Services;
using System;
using PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces;
using PraticaNetCore.Data_Base_Bancao.Repositorios;
using PraticaNetCore.Configuration;
using PraticaNetCore.Common.Util.Interfaces;
using PraticaNetCore.Common.Util;

namespace PraticaNetCore.IoC
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services,
       IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(20);
                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.AllowedForNewUsers = true;
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

            //Configure
            services.AddSingleton<EmailSettings>();

            //Repositoryes
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IAuthenticateRepository, AuthenticateRepository>();
            services.AddScoped<ILogRepository, LogRepository>();

            //Services
            services.AddScoped<IAuthenticate, AuthenticateService>();
            services.AddScoped<IProfissional, ProfissionalService>();
            services.AddScoped<IAccount, AccountService>();
            services.AddTransient<IMail, MailService>();
            services.AddScoped<IHelpers, HelpersService>();
            services.AddScoped<ILogLogin, LogLoginService>();

            //Token
            services.AddScoped<ITokenFactory, TokenFactory>();

            return services;
        }
    }
}
