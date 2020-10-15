using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.Services;
using Microsoft.Extensions.Logging;
using backend.Models;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace backend.Controllers
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
        private readonly ILogger<AuthController> logger;

        public FileController(IFileService fileService, ILogger<AuthController> logger)
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
                var file = this.fileService.LoadFSFile(filename);

                var ext = this.fileService.GetExtentionFromFilename(filename);

                var mediaType = this.contentMap[ext];

                return File(file, mediaType);
            }
            catch (Exception ex)
            {
                this.logger.LogError(500, ex, ex.Message, filename);

                return StatusCode(500, "Can't get file");
            }
        }
    }
}
