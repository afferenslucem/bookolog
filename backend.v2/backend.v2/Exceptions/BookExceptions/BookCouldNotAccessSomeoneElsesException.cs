namespace backend.Exceptions.BookExceptions
{
    public class BookCouldNotAccessSomeoneElsesException : BookException
    {
        public static readonly string ErrorMessage = "Could not access someone else's book";
        public BookCouldNotAccessSomeoneElsesException() : base(ErrorCodes.BookCouldNotAccessSomeoneElses, ErrorMessage)
        {
        }
    }
}