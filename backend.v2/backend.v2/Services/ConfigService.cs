using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services {
    public interface IConfigService
    {
        StorageConfig FileStorage { get; }
    }

    public class ConfigService : IConfigService
    {
        public StorageConfig FileStorage => Config.FileStorage;
    }
}
