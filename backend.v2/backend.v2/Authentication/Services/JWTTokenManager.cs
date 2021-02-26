using System;
using System.Text;
using backend.v2.Authentication.Models;
using backend.v2.Utils;

namespace backend.v2.Authentication.Services
{
    public interface IJWTTokenManager
    {
        DateTime NextAccessTime { get; }
        DateTime NextRefrashTime { get; }
        string GenerateToken(TokenData data);
        TokenData ReadToken(string token);
    }

    public class JWTTokenManager : IJWTTokenManager
    {
        public DateTime NextAccessTime
        {
            get
            {
                return DateTime.UtcNow.AddSeconds(Config.Cookie.AcceptTimeSeconds);
            }
        }
        public DateTime NextRefrashTime
        {
            get
            {
                return DateTime.UtcNow.AddSeconds(Config.Cookie.RefrashTimeSeconds);
            }
        }

        private AESCrypter Crypter = new AESCrypter(Config.SessionChiper.Key, Config.SessionChiper.Salt); 

        public string GenerateToken(TokenData data)
        {
            var serializedData = this.ConcatParameters(data);

            return Crypter.Encode(serializedData);
        }
        public string GenerateAccessToken(TokenData data)
        {
            var serializedData = this.ConcatParameters(data);

            return Crypter.Encode(serializedData);
        }

        private string ConcatParameters(TokenData data)
        {
            var sb = new StringBuilder();

            sb.Append(data.SessionGuid);
            sb.Append(';');
            sb.Append(data.UserId);
            sb.Append(';');
            sb.Append(data.ValidityDate);

            return sb.ToString();
        }

        public TokenData ReadToken(string token)
        {
            var serializedData = Crypter.Decode(token);

            return this.ReadParameters(serializedData);
        }

        private TokenData ReadParameters(string serializedData)
        {
            var splitted = serializedData.Split(';');

            var sessionGuid = Guid.Parse(splitted[0]);
            var userId = long.Parse(splitted[1]);
            var validityDate = DateTime.Parse(splitted[2]);

            return new TokenData()
            {
                SessionGuid = sessionGuid,
                UserId = userId,
                ValidityDate = validityDate
            };
        }
    }
}
