using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PraticaNetCore.Context;
using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.Services;
using System;
using Microsoft.OpenApi.Models;

namespace PraticaNetCore.IoC
{
    public static class DependencyInjectionSwagger
    {
        public static IServiceCollection AddInfrastructureSwagger(this IServiceCollection services,
       IConfiguration configuration)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PraticaNetCore", Version = "v1" });

                //Codigo padrao da microsfot.Doc
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description =
                     "JWT Authorization Header - utilizado com Bearer Authentication.\r\n\r\n" +
                     "Digite 'Bearer' [espaço] e então seu token no campo abaixo.\r\n\r\n" +
                     "Exemplo (informar sem as aspas): 'Bearer 12345abcdef'",
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });

            return services;
        }
    }
}
