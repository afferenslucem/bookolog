using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.v2.Utils
{
    public static class RandomString
    {
        private const string pool = "0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        private static readonly Random rd = new Random(DateTime.Now.Millisecond);

        public static string GetRandomString(int len)
        {
            var sb = new StringBuilder();

            for(var i = 0; i < len; i++)
            {
                var temp = pool[rd.Next(0, pool.Length)];

                sb.Append(temp);
            }

            return sb.ToString();
        }
    }
}
