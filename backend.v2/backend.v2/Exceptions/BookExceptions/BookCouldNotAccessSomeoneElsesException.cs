namespace backend.Exceptions.BookExceptions
{
    public class EntityAccessDenied : BookException
    {
        public static readonly string ErrorMessage = "Could not access someone else's book";
        public EntityAccessDenied() : base(ErrorCodes.BookCouldNotAccessSomeoneElses, ErrorMessage)
        {
        }
    }
}