using PraticaNetCore.ViewModel;
using PraticaNetCore.ViewModel.Types;
using System.Threading.Tasks;

namespace PraticaNetCore.Services.Interfaces
{
    public interface IAuthenticate
    {
        Task<AutenticacaoEnum> Authenticate(LoginModel user);
        Task<bool> RegisterUser(string nome, string email, string password);
        Task Logout();
    }
}
