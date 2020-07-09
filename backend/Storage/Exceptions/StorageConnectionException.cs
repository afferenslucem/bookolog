using System;
using System.Collections.Generic;
using System.Text;

namespace Storage.Exceptions
{
    public class StorageConnectionException : StorageException
    {
        public StorageConnectionException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
