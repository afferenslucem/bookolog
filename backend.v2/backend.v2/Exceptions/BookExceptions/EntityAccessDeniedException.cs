namespace backend.v2.Exceptions.BookExceptions
{
    public class EntityAccessDeniedException : BookException
    {
        public static readonly string ErrorMessage = "Could not access someone else's book";
        public EntityAccessDeniedException() : base(ErrorCodes.BookCouldNotAccessSomeoneElses, ErrorMessage)
        {
        }
    }
}