using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Storage
{
    public interface IUserStorage
    {
        Task<User> GetByLogin(string login);
        Task<User> GetById(long id);
        Task<User> Save(User user);
        Task<User> Update(User user);
        Task<User> Delete(long id);
    }
    
    public class UserStorage : IUserStorage
    {
        public async Task<User> GetByLogin(string login) {
            using var context = new BookologContext();

            return await context.Users.Where(item => item.Login == login).SingleOrDefaultAsync();
        }

        public async Task<User> GetById(long id) {
            using var context = new BookologContext();

            var user = await context.Users.Where(item => item.Id == id).SingleOrDefaultAsync();

            return user;
        }

        public async Task<User> Save(User user) {
            using var db = new BookologContext();

            await db.Users.AddAsync(user);

            await db.SaveChangesAsync();

            return user;
        }

        public async Task<User> Update(User user) {
            using var db = new BookologContext();

            db.Users.Update(user);

            await db.SaveChangesAsync();

            return user;
        }

        public async Task<User> Delete(long id) {
            using var db = new BookologContext();

            var user = await db.Users.Where(item => item.Id == id).SingleAsync();
            
            db.Users.Remove(user);

            await db.SaveChangesAsync();

            return user;
        }
        public async Task<User> Delete(string login) {
            using var db = new BookologContext();

            var user = await db.Users.Where(item => item.Login == login).SingleAsync();
            
            db.Users.Remove(user);

            await db.SaveChangesAsync();

            return user;
        }
    }
}
