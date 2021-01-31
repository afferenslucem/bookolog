using backend.Models;
using backend.Storages;
using System;
using System.Threading.Tasks;
using backend.Models.Authentication;
using Newtonsoft.Json;
using backend.v2.Utils;
using System.Collections.Generic;
using System.Security.Claims;
using backend.v2.Authentication.Models;

namespace backend.v2.Services
{
    public interface ISessionService
    {
        Task<string> GetToken(long userId, string login, ClaimsPrincipal principal);
        Task<string> UpdateToken(Session session);
        Task<Session> Get(Guid guid, bool withUser = false);
        Task<Session> Save(Session session);
        Task Update(Session session);
        Task Delete(Guid guid);
        Task<Session> ParseToken(string token);
        Session UpdateSessionExpirationTime(Session session);

        int RefrashHours { get; }
    }

    public class SessionService : ISessionService
    {
        public int HoursValidityTime { get; private set; } = 1;
        public int RefrashRate { get; private set; } = 120;

        public int RefrashHours
        {
            get
            {
                return HoursValidityTime * RefrashRate;
            }
        }

        private readonly AESCrypter CookieCrypter;

        private ISessionStorage storage;

        public SessionService()
        {
            this.storage = new SessionStorage();

            this.CookieCrypter = new AESCrypter(
                Config.SessionChiper.Key,
                Config.SessionChiper.Salt
                );
        }

        public SessionService(ISessionStorage storage)
        {
            this.storage = storage;


            this.CookieCrypter = new AESCrypter(
                Config.SessionChiper.Key,
                Config.SessionChiper.Salt
                );
        }

        ~SessionService()
        {
            this.CookieCrypter.Dispose();
        }

        public async Task<string> GetToken(long userId, string login, ClaimsPrincipal principal)
        {
            var token = JsonConvert.SerializeObject(new TokenData
            {
                Login = login,
                UserId = userId
            });

            using var chiphrator = new AESCrypter();

            var cookie = new CookieData
            {
                AccessExpired = DateTime.UtcNow.AddDays(HoursValidityTime),
                RefreshExpired = DateTime.UtcNow.AddDays(HoursValidityTime * RefrashRate),
                Guid = Guid.NewGuid(),
                TokenData = chiphrator.Encode(token),
            };

            var cookieJson = JsonConvert.SerializeObject(cookie);

            var session = this.GetSession(cookie, userId, chiphrator);

            await this.Save(session);

            return this.CookieCrypter.Encode(cookieJson);
        }

        public async Task<string> UpdateToken(Session session)
        {
            var token = JsonConvert.SerializeObject(new TokenData
            {
                Login = session.Login,
                UserId = session.UserId
            });

            using var chiphrator = new AESCrypter();

            var cookie = new CookieData
            {
                AccessExpired = DateTime.UtcNow.AddDays(HoursValidityTime),
                RefreshExpired = DateTime.UtcNow.AddDays(HoursValidityTime * RefrashRate),
                Guid = session.Guid.Value,
                TokenData = chiphrator.Encode(token),
            };

            var cookieJson = JsonConvert.SerializeObject(cookie);

            session.SessionKey = chiphrator.Key;
            session.SessionSalt = chiphrator.IV;

            await this.Update(session);

            return this.CookieCrypter.Encode(cookieJson);
        }


        private Session GetSession(CookieData cookie, long userId, AESCrypter crypter)
        {
            return new Session
            {
                Guid = cookie.Guid,
                AccessExpired = cookie.AccessExpired,
                RefreshExpired = cookie.RefreshExpired,
                UserId = userId,
                SessionKey = crypter.Key,
                SessionSalt = crypter.IV,
            };
        }

        public async Task<Session> ParseToken(string token)
        {
            var cookieJson = this.CookieCrypter.Decode(token);
            var cookie = JsonConvert.DeserializeObject<CookieData>(cookieJson);

            var session = await this.Get(cookie.Guid, true);

            var crypter = new AESCrypter(session.SessionKey, session.SessionSalt);

            var tokenDataJson = crypter.Decode(cookie.TokenData);
            var tokenData = JsonConvert.DeserializeObject<TokenData>(tokenDataJson);

            var result = this.GetSession(cookie, tokenData.UserId, crypter);
            result.StateJson = session.StateJson;
            result.User = session.User;
            result.Login = tokenData.Login;

            return result;
        }

        public Session UpdateSessionExpirationTime(Session session)
        {
            session.AccessExpired = DateTime.Now.AddHours(HoursValidityTime);
            session.RefreshExpired = DateTime.Now.AddHours(HoursValidityTime * RefrashRate);

            return session;
        }

        public async Task<Session> Get(Guid guid, bool withUser = false)
        {
            return await this.storage.Get(guid, withUser);
        }

        public async Task<Session> Save(Session session)
        {
            return await this.storage.Save(session);
        }

        public async Task Update(Session session)
        {
            await this.storage.Update(session);
        }

        public async Task Delete(Guid guid)
        {
            await this.storage.Delete(guid);
        }
    }
}
