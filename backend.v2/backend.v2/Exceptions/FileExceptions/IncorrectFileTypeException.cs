using System;

namespace backend.Exceptions.FileExceptions
{
    public class IncorrectFileTypeException : Exception
    {
        public IncorrectFileTypeException(string ext) : base(string.Format("Incorrect extension: \"{0}\"", ext)) {}
    }
}
