using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using backend.v2.Exceptions.FileExceptions;

namespace backend.v2.Services
{
    public interface IFileSystemService
    {
        Task WrileFile(IFormFile file, string path);
        void Delete(string path);
        FileStream GetFileStream(string path);
        string GetRandomFileName();
    }

    public class FileSystemService : IFileSystemService
    {
        public void Delete(string path)
        {
            System.IO.File.Delete(path);
        }

        public FileStream GetFileStream(string path)
        {
            try
            {
                return System.IO.File.OpenRead(path);
            }
            catch (DirectoryNotFoundException ex)
            {
                throw new FileReadException(ex);
            }
            catch (FileNotFoundException ex)
            {
                throw new FileReadException(ex);
            }
        }

        public async Task WrileFile(IFormFile file, string path)
        {
            using var stream = System.IO.File.Create(path);

            await file.CopyToAsync(stream);
        }

        public string GetRandomFileName()
        {
            return Path.GetRandomFileName();
        }
    }
}
