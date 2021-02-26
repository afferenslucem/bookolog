namespace backend.v2.Exceptions.BookExceptions
{
    public class BookException : BookologException
    {
        public BookException(ErrorCodes code, string message) : base(code, message)
        {
        }
    }
}