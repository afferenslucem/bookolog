namespace backend.Exceptions.BookExceptions
{
    public class BookCouldNotAccessSomeoneElsesException : BookException
    {
        public BookCouldNotAccessSomeoneElsesException() : base(ErrorCodes.BookCouldNotAccessSomeoneElses, "Could not access someone else's book")
        {
        }
    }
}