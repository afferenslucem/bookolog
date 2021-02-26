using System;

namespace backend.v2.Exceptions
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
        public BookologException(ErrorCodes code, string message) : base(message)
        {
            Code = code;
        }

        public ErrorCodes Code { get; set; }
    }
}