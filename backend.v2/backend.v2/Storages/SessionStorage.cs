using backend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models.Authentication;

namespace backend.Storages
{
    public interface ISessionStorage
    {   
        Task<Session> Get(Guid guid, bool withUser = false);
        Task<Session> Save(Session session);
        Task Update(Session session);
        Task Delete(Guid guid);
    }

    public class SessionStorage: ISessionStorage
    {
        public async Task<Session> Save(Session session)
        {
            using var context = new BookologContext();
            var set = context.Sessions;

            await set.AddAsync(session);

            await context.SaveChangesAsync();

            return session;
        }
        
        public async Task Update(Session session)
        {
            using var context = new BookologContext();
            var set = context.Sessions;

            set.Update(session);

            await context.SaveChangesAsync();
        }
        
        public async Task Delete(Guid guid)
        {
            using var context = new BookologContext();
            var set = context.Sessions;

            var session = set.Where(item => item.Guid == guid).Take(1);

            set.RemoveRange(session);

            await context.SaveChangesAsync();
        }
        
        public async Task<Session> Get(Guid guid, bool withUser = false)
        {
            using var context = new BookologContext();
            var set = context.Sessions;

            if(withUser) {                
                var session = await set.Include(item => item.User).Include(item => item.User.Avatar).Where(item => item.Guid == guid).FirstAsync();
                return session;
            }
            else {
                var session = await set.Where(item => item.Guid == guid).FirstAsync();
                return session;
            }
        }
    }
}
