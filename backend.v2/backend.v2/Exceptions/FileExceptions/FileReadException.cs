using System;

namespace backend.v2.Exceptions.FileExceptions
{
    public class FileReadException : Exception
    {
        public FileReadException(Exception inner): base(inner.Message, inner){}
    }
}
