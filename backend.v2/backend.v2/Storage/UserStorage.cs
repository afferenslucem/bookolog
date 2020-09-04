using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Storage
{
    public class UserStorage
    {
        public async Task<User> GetByLogin(string login) {
            using var context = new BookologContext();

            var user = await context.Users.Where(item => item.Login == login).SingleAsync();

            return user;
        }

        public async Task<User> GetById(long id) {
            using var context = new BookologContext();

            var user = await context.Users.Where(item => item.Id == id).SingleAsync();

            return user;
        }

        public async Task<User> Save(User user) {
            using var db = new BookologContext();

            db.Add(user);

            await db.SaveChangesAsync();

            return user;
        }

        public async Task<User> Update(User user) {
            using var db = new BookologContext();

            db.Update(user);

            await db.SaveChangesAsync();

            return user;
        }

        public async Task<User> Delete(User user) {
            using var db = new BookologContext();

            db.Remove(user);

            await db.SaveChangesAsync();

            return user;
        }
    }
}
