using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PraticaNetCore.Configuration;
using PraticaNetCore.Services.Interfaces;
using PraticaNetCore.ViewModel;
using System.Threading.Tasks;

namespace PraticaNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BruteForceController : Controller
    {
        #region ESCONDIDO
        private string Username;
        private string Password;
        private const string ELONMUSK = "ELONMUSK";
        #endregion

        private readonly BRUTEFORCE _bRUTEFORCE;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public BruteForceController(UserManager<IdentityUser> userManager,
                                    RoleManager<IdentityRole> roleManager,
                                    IOptions<BRUTEFORCE> bRUTEFORCE)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _bRUTEFORCE = bRUTEFORCE.Value;
        }

        [HttpPost("CriarUsuarioMaster")]
        public async Task<ActionResult> CriarUsuarioMaster(BruteForceDTO bruteForceDTO)
        {
            Validatin(bruteForceDTO);


            IdentityUser admin = new IdentityUser { UserName = Username };

            IdentityResult result = await _userManager.CreateAsync(admin, Password);

            if (result.Succeeded)
            {
                if (await _roleManager.FindByNameAsync(ELONMUSK) == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole(ELONMUSK));
                }

                await _userManager.AddToRoleAsync(admin, ELONMUSK);
            }

            return Ok("Parabéns agora você é o cara!");
        }

        private void Validatin(BruteForceDTO bruteForceDTO)
        {
            if (string.IsNullOrEmpty(bruteForceDTO.Username) || bruteForceDTO.Username == "string")
                Password = _bRUTEFORCE.Password;
            if (string.IsNullOrEmpty(bruteForceDTO.Password) || bruteForceDTO.Password == "string")
                Username = _bRUTEFORCE.Username;
        }
    }
}
