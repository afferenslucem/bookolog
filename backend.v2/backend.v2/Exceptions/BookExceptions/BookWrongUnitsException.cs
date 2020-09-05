namespace backend.Exceptions.BookExceptions
{
    public class BookWrongUnitsException : BookException
    {
        public readonly static string ErrorMessage = "Could not save book with wrong units.\r\n" +
                                                     "Units fields must be filled\\unfilled both and \"totalUnits\" must be greater or equal \"doneUnits\"";
        public BookWrongUnitsException() : base(ErrorCodes.BookCouldNotSaveWithWrongUnits, ErrorMessage)
        {
        }
    }
}