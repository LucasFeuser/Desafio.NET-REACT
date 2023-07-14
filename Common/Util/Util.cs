using System;

namespace PraticaNetCore.Common.Util
{
    public static class Util
    {
        public static string TratarURL(string url)
        {
            Uri uri = new Uri(url);
            return uri.Authority;
        }

        public static DateTime DecrementaHora(DateTime data, int hora)
        {
            return data.AddHours(-hora);
        }
    }
}
