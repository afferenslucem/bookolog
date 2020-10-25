using System;

namespace backend.Exceptions.FileExceptions
{
    public class FileReadException : Exception
    {
        public FileReadException(Exception inner): base(inner.Message, inner){}
    }
}
