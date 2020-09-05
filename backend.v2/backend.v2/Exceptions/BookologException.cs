using System;

namespace backend.Exceptions
{
    public enum ErrorCodes
    {
        // Auth 000 - 99
        
        // User 100 - 199
        
        // Book 200 - 299
        BookCouldNotAccessSomeoneElses = 211,
        BookCouldNotSave = 220,
        BookCouldNotSaveWithWrongUnits = 221,
        BookCouldNotSaveWithWrongDates = 222,
        
    }
    
    public class BookologException : Exception
    {
        public BookologException(ErrorCodes code, string message)
        {
            Code = code;
            Message = message;
        }

        public ErrorCodes Code { get; set; }
        public string Message { get; set; }
    }
}