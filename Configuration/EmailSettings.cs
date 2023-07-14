namespace PraticaNetCore.Configuration
{
    public sealed class EmailSettings
    {
        public string EmailFromAddress { get; } = "lucasvinchfeuser@gmail.com";
        public string Password { get; } = "lwnd quuw zzof gzoi";
        public string SmtpAddress { get; } = "smtp.gmail.com";
        public int PortNumber { get; } = 587;
    }

}
