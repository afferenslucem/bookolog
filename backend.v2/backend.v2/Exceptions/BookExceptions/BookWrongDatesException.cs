namespace backend.v2.Exceptions.BookExceptions
{
    public class BookWrongDatesException : BookException
    {
        public readonly static string ErrorMessage = "Could not save wrong books with wrong dates.\r\n" +
                                                     "If \"startDate\" and \"endDate\" filled - \"endDate\" must be greater or equal \"startDate\"";
        public BookWrongDatesException() : base(ErrorCodes.BookCouldNotSaveWithWrongDates, ErrorMessage)
        {
        }
    }
}