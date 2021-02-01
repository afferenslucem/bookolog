using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace backend.Utils
{
    public class SHA256Hasher
    {
        Random random = new Random(DateTime.Now.Millisecond);

        public string GetSHA256Hash(string password, string salt)
        {
            using (SHA256 sha = SHA256.Create())
            {
                var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password + salt));

                var builder = new StringBuilder();

                foreach (var @byte in bytes)
                {
                    builder.Append(@byte.ToString("x2"));
                }

                return builder.ToString();
            }
        }

        public string GetSalt()
        {
            var bytes = new byte[64];

            this.random.NextBytes(bytes);

            var builder = new StringBuilder();

            foreach (var @byte in bytes)
            {
                builder.Append(@byte.ToString("x2"));
            }

            return builder.ToString();
        }
    }
}
