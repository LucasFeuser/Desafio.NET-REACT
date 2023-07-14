using System;

namespace PraticaNetCore.ViewModel
{
    public class UserToken
    {
        public string User { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
