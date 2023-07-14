using Microsoft.AspNetCore.Identity;
using PraticaNetCore.Models;
using System;
using System.Threading.Tasks;

namespace PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces
{
    public interface IAuthenticateRepository
    {
        Task<IdentityUser> RegisterUser(IdentityUser user, string password);
        Task<SignInResult> CheckCredentials(IdentityUser user, string password);
        Task SignInAsync(IdentityUser user);
        Task Logout();
    }
}
