using backend.Models;
using backend.Storages;
using System;
using System.Threading.Tasks;
using backend.Models.Authentication;
using Newtonsoft.Json;
using backend.v2.Utils;
using backend.v2.Authentication.Models;

namespace backend.v2.Services
{
    public interface ISessionService
    {
        Task<Session> Get(Guid guid);
        Task<Session> Save(Session session);
        Task Update(Session session);
        Task Delete(Guid guid);
    }

    public class SessionService : ISessionService
    {
        private ISessionStorage storage;

        public SessionService()
        {
            this.storage = new SessionStorage();
        }

        public SessionService(ISessionStorage storage)
        {
            this.storage = storage;
        }

        public async Task<Session> Get(Guid guid)
        {
            return await this.storage.Get(guid);
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
