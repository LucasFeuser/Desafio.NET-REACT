using PraticaNetCore.ViewModel;

namespace PraticaNetCore.Common.Util.Interfaces
{
    public interface ITokenFactory
    {
        UserToken GenerateToken(LoginModel user);
    }
}
