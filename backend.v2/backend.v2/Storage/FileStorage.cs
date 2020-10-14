using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Storage
{
    public interface IFileStorage
    {
        Task<File> Save(File file);
        Task<File> Delete(long id);
        Task<File> GetFile(long id);
    }
    
    public class FileStorage : IFileStorage
    {
        public async Task<File> Save(File file) {
            using var db = new BookologContext();

            await db.Files.AddAsync(file);

            await db.SaveChangesAsync();

            return file;
        }
        public async Task<File> Delete(long id) {
            using var db = new BookologContext();

            var user = await db.Files.Where(item => item.Id == id).SingleAsync();
            
            db.Files.Remove(user);

            await db.SaveChangesAsync();

            return user;
        }
        public async Task<File> GetFile(long id) {
            using var db = new BookologContext();

            var file = await db.Files.Where(item => item.Id == id).SingleAsync();
            
            return file;
        }
    }
}
