﻿using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using backend.v2.Exceptions.FileExceptions;
using backend.v2.Storages;

namespace backend.v2.Services
{
    public interface IFileService
    {
        Task<Models.File> Save(IFormFile file);
        Task<Models.File> Delete(long id);
        FileStream ReadFile(string filename);
        string GetExtentionFromFilename(string filename);
    }

    public class FileService : IFileService
    {
        private readonly IFileStorage storage;
        private readonly IFileSystemService fileSystem;
        private readonly IConfigService configService;

        public FileService(IFileSystemService fileSystem, IConfigService configService)
        {
            this.storage = new FileStorage();
            this.configService = configService;
            this.fileSystem = fileSystem;
        }
        public FileService(IFileStorage storage, IFileSystemService fileSystem, IConfigService configService)
        {
            this.storage = storage;
            this.configService = configService;
            this.fileSystem = fileSystem;
        }

        public async Task<Models.File> Save(IFormFile formfile)
        {
            this.CheckExtention(formfile.FileName);
            var file = this.CreateFileEntity(formfile);

            await this.fileSystem.WrileFile(formfile, file.Path);
            var result = await this.storage.Save(file);

            return result;
        }

        public async Task<Models.File> Delete(long id)
        {   
            var file = await this.storage.GetFile(id);
            
            this.fileSystem.Delete(file.Path);

            return await this.storage.Delete(id);
        }

        public FileStream ReadFile(string filename) {
            var path = Path.Combine(this.configService.FileStorage.StoragePath, filename);
            
            return this.fileSystem.GetFileStream(path);
        }

        public string GetExtentionFromFilename(string filename) {
            var index = filename.LastIndexOf('.');

            var extension = filename.Substring(index);

            return extension;
        }

        public virtual void CheckExtention(string filename) {
            var pass = configService.FileStorage.AllowedExtensions.Any(ext => this.GetExtentionFromFilename(filename) == ext);

            if(!pass) {
                throw new IncorrectFileTypeException(filename);
            }
        }
    
        public virtual Models.File CreateFileEntity(IFormFile formfile) {
            var name = this.fileSystem.GetRandomFileName() + this.GetExtentionFromFilename(formfile.FileName);

            var path = Path.Combine(this.configService.FileStorage.StoragePath, name);

            return new Models.File() {
                Name = name, 
                Path = path,
            };
        }
    }
}
