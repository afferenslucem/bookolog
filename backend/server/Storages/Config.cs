using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Storages
{
    public class Config
    {
        public static string ConnectionString = File.ReadAllText("bookolog-connection-string.cfg");
    }
}
