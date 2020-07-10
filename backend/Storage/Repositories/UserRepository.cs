using Storage.Models;
using Storage.Readers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Repositories
{
    public interface IUserRepository
    {
        Task<IStorageUser> GetById(long id);
        Task<IStorageUser> GetByLogin(string login);
        Task<IStorageUser> Save(IStorageUser user);
        Task Update(IStorageUser user);
        Task UpdatePassword(IStorageUser user);
        Task Delete(long id);
    }

    public class UserRepository : Repository, IUserRepository
    {
        protected UserRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<IStorageUser> GetById(long id)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "select * from users where id = @id";

            cmd.Parameters.AddWithValue("id", id);

            using var reader = await cmd.ExecuteReaderAsync();

            var dataReader = new UserReader(reader);

            var result = await dataReader.ReadOne();

            return result;
        }

        public async Task<IStorageUser> GetByLogin(string login)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "select * from users where login = @login limit 1";

            cmd.Parameters.AddWithValue("login", login);

            using var reader = await cmd.ExecuteReaderAsync();

            var dataReader = new UserReader(reader);

            var result = await dataReader.ReadOne();

            return result;
        }

        public async Task<IStorageUser> Save(IStorageUser user)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "insert into users(login, password_hash, salt) values (@login, @password_hash, @salt); select last_insert_rowid();";

            cmd.Parameters.AddWithValue("login", user.Login);
            cmd.Parameters.AddWithValue("password_hash", user.PasswordHash);
            cmd.Parameters.AddWithValue("salt", user.Salt);

            var id = (long) await cmd.ExecuteScalarAsync();

            var result = new User(user);
            user.Id = id;

            return result;
        }

        public async Task Update(IStorageUser user)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "update users set login = @login where id = @id limit 1;";

            cmd.Parameters.AddWithValue("login", user.Login);
            cmd.Parameters.AddWithValue("id", user.Id);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task UpdatePassword(IStorageUser user)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "update users set password_hash = @login, salt = @salt where id = @id limit 1;";

            cmd.Parameters.AddWithValue("password_hash", user.PasswordHash);
            cmd.Parameters.AddWithValue("salt", user.Salt);
            cmd.Parameters.AddWithValue("id", user.Id);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task Delete(long id)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "delete from users where id = @id";

            cmd.Parameters.AddWithValue("id", id);

            await cmd.ExecuteNonQueryAsync();
        }

        public static IUserRepository GetRepository(string connectionString)
        {
            return new UserRepository(connectionString);
        }
    }
}
