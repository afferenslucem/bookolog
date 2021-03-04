using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using backend.v2.Exceptions.FileExceptions;
using backend.v2.Services;

namespace backend.v2.Controllers
{
    [Route("[controller]")]
    public class FileController : Controller
    {
        Dictionary<string, string> contentMap = new Dictionary<string, string>() {
            {".jpg", "image/jpeg"},
            {".jpeg", "image/jpeg"},
            {".png", "image/png"},
            {".svg", "image/svg+xml"},
        };
        private readonly IFileService fileService;
        private readonly ILogger<FileController> logger;

        public FileController(IFileService fileService, ILogger<FileController> logger)
        {
            this.fileService = fileService;
            this.logger = logger;
        }

        [HttpGet]
        [Route("{filename:maxlength(128)}")]
        public IActionResult File(string filename)
        {
            try
            {
                var file = this.fileService.ReadFile(filename);
                var ext = this.fileService.GetExtentionFromFilename(filename);
                var mediaType = this.contentMap[ext];

                return File(file, mediaType);
            }
            catch (FileReadException ex)
            {
                this.logger.LogError(404, ex, ex.Message, filename);
                return StatusCode(404, "Can't get file");
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, filename);
                return StatusCode(500, "Something went wrong");
            }
        }
    }
}
