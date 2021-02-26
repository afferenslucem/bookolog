namespace backend.v2.Models
{
    public class AppSyncData
    {
        public SyncData<Book> Books {get; set;}
        public SyncData<Collection> Collections {get; set;}
    }
}