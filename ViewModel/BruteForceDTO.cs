using System.ComponentModel;

namespace PraticaNetCore.ViewModel
{
    public class BruteForceDTO
    {
        [DefaultValue("Caso NULL por padrao \n" +
            " Username: Admin \n" +
            " Password: root")]
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
