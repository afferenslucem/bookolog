using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using backend.v2.Models.Authentication;
using Npgsql;

namespace backend.v2.Storages
{
    public interface ISessionStorage
    {
        Task<Session> Get(Guid guid);
        Task<Session> Save(Session session);
        Task Update(Session session);
        Task Delete(Guid guid);
    }

    public class SessionStorage : ISessionStorage
    {
        public async Task<Session> Save(Session session)
        {
            using var context = new BookologContext();

            var guid = new NpgsqlParameter("guid", session.Guid);
            var state = new NpgsqlParameter("state", (object)session.StateJson ?? DBNull.Value);
            var validity = new NpgsqlParameter("validity", session.ValidityExpired);

            _ = await context.Database.ExecuteSqlRawAsync("INSERT INTO \"Sessions\" VALUES(@guid, @state, @validity)", guid, state, validity);

            return session;
        }

        public async Task Update(Session session)
        {
            using var context = new BookologContext();

            var guid = new NpgsqlParameter("guid", session.Guid);
            var state = new NpgsqlParameter("state", (object)session.StateJson ?? DBNull.Value);
            var validity = new NpgsqlParameter("validity", session.ValidityExpired);

            _ = await context.Database.ExecuteSqlRawAsync("UPDATE \"Sessions\" SET \"StateJson\" = @state, \"ValidityExpired\" = @validity WHERE \"Guid\" = @guid", guid, state, validity);
        }

        public async Task Delete(Guid guid)
        {
            using var context = new BookologContext();

            var guidParam = new NpgsqlParameter("guid", guid);

            _ = await context.Database.ExecuteSqlRawAsync("DELETE FROM \"Sessions\" WHERE \"Guid\" = @guid", guidParam);
        }

        public async Task<Session> Get(Guid guid)
        {
            using var context = new BookologContext();

            var session = await context.Sessions
                .Where(item => item.Guid == guid)
                .OrderByDescending(item => item.ValidityExpired)
                .FirstOrDefaultAsync();

            return session;
        }
    }
}
