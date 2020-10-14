using backend.Models;
using backend.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Exceptions.BookExceptions;
using Microsoft.AspNetCore.Http;
using backend.Exceptions.FileExceptions;
using System.IO;

namespace backend.Services
{
    public interface IFileService
    {
        Task<Models.File> Save(IFormFile file);
        Task<Models.File> Delete(long id);
        FileStream LoadFSFile(string filename);
        string GetExtentionFromFilename(string filename);
    }

    public class FileService : IFileService
    {
        private readonly IFileStorage storage;

        public FileService()
        {
            this.storage = new FileStorage();
        }
        public FileService(IFileStorage storage)
        {
            this.storage = storage;
        }

        public async Task<Models.File> Save(IFormFile formfile)
        {
            this.CheckExtention(formfile.FileName);

            var file = this.CreateFile(formfile);

            await this.WriteFileToFS(formfile, file.Path);

            var result = await this.storage.Save(file);

            return result;
        }

        public async Task<Models.File> Delete(long id)
        {   
            var file = await this.storage.GetFile(id);

            System.IO.File.Delete(file.Path);

            return await this.storage.Delete(id);
        }

        public FileStream LoadFSFile(string filename) {
            var file = System.IO.File.OpenRead(Path.Combine(Config.FileStorage.StoragePath, filename));

            return file;
        }

        public string GetExtentionFromFilename(string filename) {
            var index = filename.LastIndexOf('.');

            var extension = filename.Substring(index);

            return extension;
        }

        private void CheckExtention(string filename) {
            var pass = Config.FileStorage.AllowedExtensions.Any(ext => this.GetExtentionFromFilename(filename) == ext);

            if(!pass) {
                throw new IncorrectFileTypeException();
            }
        }
    
        private Models.File CreateFile(IFormFile formfile) {
            var name = Path.GetRandomFileName() + this.GetExtentionFromFilename(formfile.FileName);
            var path = Path.Combine(Config.FileStorage.StoragePath, name);

            return new Models.File() {
                Name = name, 
                Path = path,
            };
        }

        private async Task WriteFileToFS(IFormFile file, string path) {
            using var stream = System.IO.File.Create(path);

            await file.CopyToAsync(stream);
        }
    }
}
