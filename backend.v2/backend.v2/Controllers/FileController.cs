﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using backend.v2.Exceptions.FileExceptions;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;

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

        /// <summary>
        /// Возвращает изображение по названию.
        /// </summary>
        /// <param name="filename">Название файла.</param>
        /// <response code="200">Возвращает файловый поток.</response>
        /// <response code="404">Не возможно получить файл по названию.</response>
        [HttpGet]
        [Route("{filename:maxlength(128)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
