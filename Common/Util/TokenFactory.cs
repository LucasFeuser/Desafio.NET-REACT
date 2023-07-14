using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PraticaNetCore.ViewModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using Microsoft.Extensions.Configuration;
using PraticaNetCore.Common.Util.Interfaces;

namespace PraticaNetCore.Common.Util
{
    public class TokenFactory : ITokenFactory
    {
        
        private readonly IConfiguration _configuration;

        public TokenFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public UserToken GenerateToken(LoginModel user)
        {
            var claims = new[]
            {
                new Claim("email", user.Email),
                new Claim("MyToken", "Token Feuser"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));

            var assinatura = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expirationTime = DateTime.UtcNow.AddMinutes(15);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: expirationTime,
                signingCredentials: assinatura
                );

            return new UserToken() { Token = new JwtSecurityTokenHandler().WriteToken(token), Expiration = expirationTime, };
        }
    }
}
