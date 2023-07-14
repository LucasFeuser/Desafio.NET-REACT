using Microsoft.AspNetCore.Identity;
using PraticaNetCore.Models;
using PraticaNetCore.Services.Interfaces;
using System.Threading.Tasks;
using System;
using PraticaNetCore.Data_Base_Bancao.Repositorios.Interfaces;

namespace PraticaNetCore.Data_Base_Bancao.Repositorios
{
    public class AuthenticateRepository : IAuthenticateRepository
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthenticateRepository(SignInManager<IdentityUser> signInManager,
                                   UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<IdentityUser> RegisterUser(IdentityUser user, string password)
        {
            try
            {
               await _userManager.CreateAsync(user, password);                
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }

            return user;
        }

        public async Task<SignInResult> CheckCredentials(IdentityUser user, string password)
        {
            return await _signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure: true);
        }

        public async Task SignInAsync(IdentityUser user)
        {
            await _signInManager.SignInAsync(user, isPersistent: false);
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
